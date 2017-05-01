import {Investimento,Aluguel} from '../aluguel/aluguel';
import {Usuario} from '../usuario';
import {GlobalConfiguration} from '../global-configuration';
import {FinanciamentoConfig} from '../financiamento-config';
import {FgtsNasParcelas} from './fgts-nas-parcelas'
import {Financiamento} from './financiamento';
import {ExtratoFinanciamento} from './extrato-financiamento';
import {Parcela} from './parcela';

export class ProcessadorFinanciamento {
    private financiamento: Financiamento;
    private imovel: Investimento;
    private fundoGarantia: Investimento;
    private salario: Aluguel;
    private readonly user: Usuario;
    private readonly config: FinanciamentoConfig;
    public Extrato: Array<ExtratoFinanciamento> = new Array<ExtratoFinanciamento>();

    constructor(user: Usuario, config: FinanciamentoConfig) {
        this.user = user;
        this.config = config;
    }

    public Processar(): void {
        this.financiamento = new Financiamento(4000, 0.02);
        this.imovel = new Investimento(20000, 0.005);
        this.fundoGarantia = new Investimento(5000, 0.003);
        this.salario = new Aluguel(4000, 0.005);
        let processador = new FgtsNasParcelas();

        this.initialize();

        for(let i=0; i<this.user.prestacoes;i++) {
            this.imovel.Depositar();            
            let sc = this.financiamento.SaldoCorrigido();
            let p = new Parcela(this.config,this.user); //TODO
            let amortizacao = p.Amortizacao(sc, this.user.prestacoes-i);
            this.financiamento.Pagar(amortizacao);
            this.salario.Pagar();

            let ex = new ExtratoFinanciamento();
            ex.SaldoAtual = sc - amortizacao;
            ex.Parcela = p;
            ex.ValorImovel = this.imovel.ValorAcumulado;

            if(this.fundoGarantia != null) {
                let extFgts = this.fundoGarantia.Depositar(400);
                ex.RendimentoFgts = extFgts.Rendimento;
                ex.DepositoFgts = extFgts.Deposito;
                ex.MontanteFgts = this.fundoGarantia.ValorAcumulado;

                processador.ProcessarFgts(this.Extrato, i);
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