import {Investimento,Aluguel} from '../aluguel/aluguel';
import {Usuario} from '../usuario';
import {FinanciamentoConfig} from '../financiamento-config';
import {FinanciamentoFgtsConfig} from '../financiamento-fgts-config';
import {Financiamento} from './financiamento';
import {ExtratoFinanciamento} from './extrato-financiamento';
import {Parcela} from './parcela';
import {IProcessFgts} from './i-process-fgts';
import {FgtsDependency} from './fgts-dependency';
import {AdvancedProperties} from './advanced-properties';

export class ProcessadorFinanciamento {
    private readonly financiamento: Financiamento;
    private readonly imovel: Investimento;
    private readonly fundoGarantia: Investimento;
    private readonly salario: Aluguel;
    private readonly properties: AdvancedProperties;
    private fgtsProcessor: IProcessFgts;
    public Extrato: Array<ExtratoFinanciamento> = new Array<ExtratoFinanciamento>();

    constructor(financiamento: Financiamento, imovel: Investimento, salario: Aluguel, properties: AdvancedProperties, fundo: Investimento = null) {
        this.financiamento = financiamento;
        this.imovel = imovel;
        this.salario = salario;
        this.properties = properties;
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

        for(let i=1; i<this.properties.Prestacoes();i++) {
            let ex = new ExtratoFinanciamento();
            this.Extrato.push(ex);            
            this.imovel.Depositar();           
            ex.Saldo = this.financiamento.SaldoDevedor;
            this.financiamento.Corrigir();

            let parcela = new Parcela(this.properties);
            let amortizacao = parcela.Amortizar(this.financiamento.SaldoDevedor, this.properties.Prestacoes()-i);
            this.financiamento.Pagar(amortizacao);
            this.salario.Pagar();
            
            ex.CorrecaoTaxaReferencial = this.financiamento.CorrecaoTaxaReferencial;
            ex.SaldoAtual = ex.Saldo + this.financiamento.CorrecaoTaxaReferencial - amortizacao;
            ex.Parcela = parcela;
            ex.ValorImovel = this.imovel.ValorAcumulado;

            if(this.properties.UsaFgts) {
                let extFgts = this.fundoGarantia.Depositar(this.salario.PrestacaoAluguel * this.properties.GlobalConfiguration().Fundo);
                ex.RendimentoFgts = extFgts.Rendimento;
                ex.DepositoFgts = extFgts.Deposito;
                ex.MontanteFgts = this.fundoGarantia.ValorAcumulado;

                this.fgtsProcessor.Process(dependency, i);
            }
        }
    }

    private initialize(): void {
        let ex = new ExtratoFinanciamento();
        ex.Parcela = new Parcela(this.properties);
        ex.ValorImovel = this.properties.ValorImovel();
        ex.SaldoAtual = this.properties.ValorImovel() - this.properties.Disponivel();
        ex.Saldo = this.properties.ValorImovel();
        this.financiamento.Abater(this.properties.Disponivel());
        
        if(this.properties.UsaFgts) {            
            const valorAbatido = this.fundoGarantia.ValorAcumulado;
            ex.MontanteFgts = valorAbatido;
            if(this.properties.UsaComoEntrada) {
                this.financiamento.Abater(valorAbatido);
                this.fundoGarantia.Sacar(valorAbatido);
                ex.Resgate = valorAbatido;
                ex.SaldoAtual -= valorAbatido;
            }
        };

        this.Extrato.push(ex);
    }
}