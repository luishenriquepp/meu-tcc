// problema
// como extrair o valor presente liquido ?
// o que seria o valor presente liquido nesse momento ?

export class ProcessadorDeAluguel {
    public investimento: Investimento;
    public aluguel: Aluguel;

    public Processar(juros: number): void {
        
        this.aluguel.Pagar();
        
        let valorComparado = juros - this.aluguel.aluguelInicial;
        if(valorComparado > 0) {
            this.investimento.Depositar(valorComparado);
        }
    }
}

export class Aluguel {
    private rendimentoMensal: number;;
    public aluguelInicial: number;
    public parcela: Extrato[] = [];

    constructor(rendimento: number = 0.005) {
        this.rendimentoMensal = rendimento;
    }

    public Pagar(): void {
        if(this.ehAnoNovo()) {
            this.aluguelInicial += this.aluguelInicial * this.rendimentoMensal;
        }
        let extrato = new Extrato(this.aluguelInicial);
        this.parcela.push(extrato);
    }

    private ehAnoNovo(): boolean {
        if(!this.parcela.length) {
            return false;
        }
        return this.parcela.length % 12 == 0;
    }
}

export class Investimento {
    public parcela: Extrato[] = [];
    private rendimentoMensal: number;    
    
    private _valorAcumulado : number;
    public get ValorAcumulado() : number {
        return this._valorAcumulado;
    }            

    constructor(deposito: number = 0,rendimento: number = 0.05) {
        this.rendimentoMensal = rendimento;
        this._valorAcumulado = deposito;
    }

    public Depositar (valor: number = 0): void {
        let extrato = new Extrato(valor);
        this.parcela.push(extrato);
        
        this.render();
        
        this._valorAcumulado += valor;
    }

    private render(): void {
        this._valorAcumulado += this._valorAcumulado*this.rendimentoMensal;
    }
}

export class Extrato {    
    
    private _valor : number;
    public get Valor() : number {
        return this._valor;
    }    

    constructor(valor: number) {
        this._valor = valor;
    }
} 