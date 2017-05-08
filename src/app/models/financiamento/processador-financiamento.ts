import {Investimento,Aluguel} from '../aluguel/aluguel';
import {Usuario} from '../usuario';
import {FinanciamentoConfig} from '../financiamento-config';
import {Financiamento} from './financiamento';
import {ExtratoFinanciamento} from './extrato-financiamento';
import {Parcela} from './parcela';
import {IProcessFgts} from './i-process-fgts';
import {FgtsDependency} from './fgts-dependency';

export class ProcessadorFinanciamento {
    private readonly financiamento: Financiamento;
    private readonly imovel: Investimento;
    private readonly fundoGarantia: Investimento;
    private readonly salario: Aluguel;
    private readonly user: Usuario;
    private readonly config: FinanciamentoConfig;
    private fgtsProcessor: IProcessFgts;
    public Extrato: Array<ExtratoFinanciamento> = new Array<ExtratoFinanciamento>();

    constructor(user: Usuario, config: FinanciamentoConfig) {
        this.user = user;
        this.config = config;
    }

    public set Processor(processor: IProcessFgts) {
        this.fgtsProcessor = processor;
    }    

    public Processar(): void {
        let dependency = new FgtsDependency(this.Extrato, this.financiamento, this.fundoGarantia);

        this.initialize();

        for(let i=0; i<this.user.prestacoes;i++) {
            this.imovel.Depositar();            
            let sc = this.financiamento.SaldoCorrigido();
            let p = new Parcela(this.config,this.user);
            let amortizacao = p.Amortizacao(sc, this.user.prestacoes-i);
            this.financiamento.Pagar(amortizacao);
            this.salario.Pagar();

            let ex = new ExtratoFinanciamento();
            ex.SaldoAtual = sc - amortizacao;
            ex.Parcela = p;
            ex.ValorImovel = this.imovel.ValorAcumulado;

            if(this.fundoGarantia != null) {
                let extFgts = this.fundoGarantia.Depositar(this.salario.PrestacaoAluguel * this.user.GlobalConfiguration.Fundo);
                ex.RendimentoFgts = extFgts.Rendimento;
                ex.DepositoFgts = extFgts.Deposito;
                ex.MontanteFgts = this.fundoGarantia.ValorAcumulado;

                this.fgtsProcessor.Process(dependency, i);
            }
        }
    }

    private initialize(): void {
        let ex = new ExtratoFinanciamento();
        ex.ValorImovel = this.user.valorImovel;
        ex.SaldoAtual = this.user.valorImovel - this.user.disponivel - this.user.FGTS;
        this.Extrato.push(ex);
    }
}