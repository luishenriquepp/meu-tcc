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

    constructor(financiamento: Financiamento, imovel: Investimento, salario: Aluguel, user: Usuario, config: FinanciamentoConfig, fundo: Investimento = null) {
        this.financiamento = financiamento;
        this.imovel = imovel;
        this.salario = salario;
        this.user = user;
        this.config = config;
        this.fundoGarantia = fundo;
    }

    public set Processor(processor: IProcessFgts) {
        this.fgtsProcessor = processor;
    } 
    public get Processor() {
        return this.fgtsProcessor;
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

            if(this.user.usaFGTS) {
                console.log(this.fundoGarantia);
                let extFgts = this.fundoGarantia.Depositar(this.salario.PrestacaoAluguel * this.user.GlobalConfiguration.Fundo);
                console.log(extFgts);
                ex.RendimentoFgts = extFgts.Rendimento;
                ex.DepositoFgts = extFgts.Deposito;
                ex.MontanteFgts = this.fundoGarantia.ValorAcumulado;

                this.fgtsProcessor.Process(dependency, i);
            }
            this.Extrato.push(ex);
        }
    }

    private initialize(): void {
        let ex = new ExtratoFinanciamento();
        ex.ValorImovel = this.user.valorImovel;
        ex.SaldoAtual = this.user.valorImovel - this.user.disponivel;
        
        if(this.user.usaFGTS && this.config.FGTSConfig.Entrada) {
            ex.SaldoAtual -= this.user.FGTS
            this.fundoGarantia.Sacar(this.user.FGTS);
        };

        this.Extrato.push(ex);
    }
}