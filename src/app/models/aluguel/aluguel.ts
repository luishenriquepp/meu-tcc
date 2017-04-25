import { LogicaTemporal } from '../../utils/logica-temporal';
import { ValorPresente } from '../../utils/valor-presente';
import { Financiamento } from '../financiamento';

export class Comparador {
    private readonly _aluguel: Aluguel;
    private readonly _investimento: Investimento;
    private readonly _fundoFGTS: Investimento;
    private readonly _finInvestimento: Investimento;
    private readonly _financiamento: Financiamento;
    private readonly _salario: Aluguel;

    public readonly Gerenciador: GerenciadorDoExtrato = new GerenciadorDoExtrato();

    constructor(investimento: Investimento, aluguel: Aluguel, financiamento: Financiamento, fundoFGTS: Investimento = null) {
        this._investimento = investimento;
        this._aluguel = aluguel;
        this._financiamento = financiamento;
        this._fundoFGTS = fundoFGTS;
        this._finInvestimento = new Investimento(0,this._financiamento.Usuario.GlobalConfiguration.RentabilidadeLiquidaMensal());
        this._salario = new Aluguel(financiamento.Usuario.renda, financiamento.Usuario.crescimentoSalarial);
    }
        
    public Processar(): void {
        this.inicializar();
        for(let i=1;i<this._financiamento.Prestacoes.length;i++) {
            
            let fdc = this._financiamento.Prestacoes[i];
            this._aluguel.Pagar();
            this._salario.Pagar();
                                
            let valor = fdc.parcela - this._aluguel.PrestacaoAluguel;

            let extInvestimento: ExtratoInvestimento;
            let extFinInvestimento: ExtratoInvestimento;

            // deposita a diferenca entre parcela e aluguel num fundo do aluguel enquanto for positivo
            // caso contrario, deposita a diferença positiva num fundo associado ao financiamento
            if(valor > 0) {
                extInvestimento = this._investimento.Depositar(valor);
                extFinInvestimento = this._finInvestimento.Depositar();
            } else {
                extInvestimento = this._investimento.Depositar();
                extFinInvestimento = this._finInvestimento.Depositar(valor*-1);
            }

            let extratoAluguel = new ExtratoAluguel();
            
            extratoAluguel.Aluguel = this._aluguel.PrestacaoAluguel;            
            extratoAluguel.RendimentoFundo = extInvestimento.Rendimento;
            extratoAluguel.MontanteInvestimento = this._investimento.ValorAcumulado;
            extratoAluguel.DepositoFundo = extInvestimento.Deposito;
            
            if(this._fundoFGTS) {
                let extFGTS = this._fundoFGTS.Depositar(this._salario.PrestacaoAluguel * 0.08);
                extratoAluguel.RendimentoFGTS = extFGTS.Rendimento;
                extratoAluguel.DepositoFGTS = extFGTS.Deposito;
                extratoAluguel.MontanteFGTS = this._fundoFGTS.ValorAcumulado;
            }
            
            extratoAluguel.PatrimonioFinanciamento = fdc.patrimonio;
            extratoAluguel.RendimentoFinInvestimento = extFinInvestimento.Rendimento;
            extratoAluguel.MontanteFinInvestimento = this._finInvestimento.ValorAcumulado;
            extratoAluguel.DepositoFinInvestimento = extFinInvestimento.Deposito;
            extratoAluguel.Parcela = fdc.parcela;
            
            this.Gerenciador.Adicionar(extratoAluguel);
        }    
    }

    private inicializar(): void {
        let extratoAluguel = new ExtratoAluguel();
        if(this._fundoFGTS) {
            extratoAluguel.MontanteFGTS = this._fundoFGTS.ValorAcumulado;
        }
        extratoAluguel.PatrimonioFinanciamento = this._financiamento.Prestacoes[0].patrimonio;
        extratoAluguel.MontanteInvestimento = this._investimento.ValorAcumulado;
        this.Gerenciador.Adicionar(extratoAluguel);
    }

    public Financiamento(): Financiamento {
        return this._financiamento;
    }
}

export class Aluguel {
    private _prestacoes: number = 0;
    private _rendimentoMensal: number;
    private _prestacaoAluguel: number;
    public get PrestacaoAluguel(): number {
        return this._prestacaoAluguel;
    }

    constructor(primeiroAluguel:number, rendimento: number = 0.005) {
        this._rendimentoMensal = rendimento;
        this._prestacaoAluguel = primeiroAluguel;
    }

    public Pagar(): void {
        this._prestacoes++;
        if(LogicaTemporal.IniciouAnoNovo(this._prestacoes)) {
            this._prestacaoAluguel += this._prestacaoAluguel * this._rendimentoMensal;
        }
    }
}

export class Investimento {
    private rendimentoMensal: number;    
    
    private _valorAcumulado : number;
    public get ValorAcumulado() : number {
        return this._valorAcumulado;
    }            

    constructor(deposito: number = 0, rendimento: number = 0.005) {
        this.rendimentoMensal = rendimento;
        this._valorAcumulado = deposito;
    }

    public Depositar (valor: number = 0): ExtratoInvestimento {        
        let rendimento = this.render();
        
        if(valor > 0) {
            this._valorAcumulado += valor;
        }

        return new ExtratoInvestimento(valor, rendimento);
    }

    private render(): number {
        let rendimento = this._valorAcumulado*this.rendimentoMensal;
        this._valorAcumulado += rendimento;
        return rendimento;
    }
}

export class GerenciadorDoExtrato {
    private _extratoAluguel: ExtratoAluguel[] = [];
    public get ExtratoAluguel(): ExtratoAluguel[] {
        return this._extratoAluguel;
    }

    public Adicionar(extratoAluguel: ExtratoAluguel): void {
        this._extratoAluguel.push(extratoAluguel);        
        this.ValorPresenteLiquido(extratoAluguel);
    }

    private ValorPresenteLiquido(extrato: ExtratoAluguel): void {
        let qtdExtratos = this._extratoAluguel.length;
        if(qtdExtratos > 1) {
            let vp = ValorPresente.Calcula(extrato.SaldoParcial(), qtdExtratos);
            extrato.ValorPresente = vp;
        }        
    }
}

export class ExtratoAluguel {      
    private _aluguel : number = 0;
    public get Aluguel() : number {
        return this._aluguel;
    }
    public set Aluguel(v : number) {
        this._aluguel = v;
    }
            
    private _rendimentoFundo : number = 0;
    public get RendimentoFundo() : number {
        return this._rendimentoFundo;
    }
    public set RendimentoFundo(v : number) {
        this._rendimentoFundo = v;
    }
        
    private _depositoFundo : number = 0;
    public get DepositoFundo() : number {
        return this._depositoFundo;
    }
    public set DepositoFundo(v : number) {
        this._depositoFundo = v;
    }
    
    private _rendimentoFGTS : number = 0;
    public get RendimentoFGTS() : number {
        return this._rendimentoFGTS;
    }
    public set RendimentoFGTS(v : number) {
        this._rendimentoFGTS = v;
    }
        
    private _depositoFGTS : number = 0;
    public get DepositoFGTS() : number {
        return this._depositoFGTS;
    }
    public set DepositoFGTS(v : number) {
        this._depositoFGTS = v;
    }

    public SaldoParcial(): number {
        return this._depositoFundo + this._rendimentoFundo + this._depositoFGTS + this._rendimentoFGTS;
    }
        
    public Patrimonio() : number {
        return this._montanteInvestimento + this._montanteFGTS;
    }
    
    private _valorPresente : number = 0;
    public get ValorPresente() : number {
        return this._valorPresente;
    }
    public set ValorPresente(v : number) {
        this._valorPresente = v;
    }    
    
    private _montanteFGTS : number = 0;
    public get MontanteFGTS() : number {
        return this._montanteFGTS;
    }
    public set MontanteFGTS(v : number) {
        this._montanteFGTS = v;
    }
    
    private _montanteInvestimento : number = 0;
    public get MontanteInvestimento() : number {
        return this._montanteInvestimento;
    }
    public set MontanteInvestimento(v : number) {
        this._montanteInvestimento = v;
    }
    
    private _patrimonioFinanciamento : number = 0;
    public get PatrimonioFinanciamento() : number {
        return this._patrimonioFinanciamento;
    }
    public set PatrimonioFinanciamento(v : number) {
        this._patrimonioFinanciamento = v;
    }
    
    private _montanteFinInvestimento : number = 0;
    public get MontanteFinInvestimento() : number {
        return this._montanteFinInvestimento;
    }
    public set MontanteFinInvestimento(v : number) {
        this._montanteFinInvestimento = v;
    }
    
    private _depositoFinInvestimento : number = 0;
    public get DepositoFinInvestimento() : number {
        return this._depositoFinInvestimento;
    }
    public set DepositoFinInvestimento(v : number) {
        this._depositoFinInvestimento = v;
    }
    
    private _rendimentoFinInvestimento : number = 0;
    public get RendimentoFinInvestimento() : number {
        return this._rendimentoFinInvestimento;
    }
    public set RendimentoFinInvestimento(v : number) {
        this._rendimentoFinInvestimento = v;
    }

    public PatrimonioFinTotal(): number {
        return this._montanteFinInvestimento + this._patrimonioFinanciamento;
    }
    
    private _parcela : number = 0;
    public get Parcela() : number {
        return this._parcela;
    }
    public set Parcela(v : number) {
        this._parcela = v;
    }
     
}

class ExtratoInvestimento {
    constructor(deposito: number, rendimento: number) {
        this._deposito = deposito;
        this._rendimento = rendimento;
    }
    
    private _deposito : number;
    public get Deposito() : number {
        return this._deposito;
    }
        
    private _rendimento : number;
    public get Rendimento() : number {
        return this._rendimento;
    }    
}