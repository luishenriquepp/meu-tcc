import { LogicaTemporal } from '../../utils/logica-temporal';

export class Comparador {
    private readonly _investimento: Investimento;
    private readonly _aluguel: Aluguel;
    public readonly gerenciador: GerenciadorDoExtrato;

    public Processar(juros: number): void {
        
        this._aluguel.Pagar();
        
        let valorComparado = juros - this._aluguel.PrestacaoAluguel;
        if(valorComparado > 0) {
            this._investimento.Depositar(valorComparado);
        }

        let extratoAluguel = new ExtratoAluguel({
            Aluguel: this._aluguel.PrestacaoAluguel,
            DepositoFundo: 0,
            RendimentoFundo: 0,
            DepositoFGTS: 0,
            RendimentoFGTS: 0
        });
        
        this.gerenciador.Adicionar(extratoAluguel);
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

    constructor(deposito: number = 0, rendimento: number = 0.05) {
        this.rendimentoMensal = rendimento;
        this._valorAcumulado = deposito;
    }

    public Depositar (valor: number = 0): void {        
        this.render();
        
        this._valorAcumulado += valor;
    }

    private render(): void {
        this._valorAcumulado += this._valorAcumulado*this.rendimentoMensal;
    }    
}

export class GerenciadorDoExtrato {
    
    private _extratoAluguel: ExtratoAluguel[] = [];
    public get ExtratoAluguel(): ExtratoAluguel[] {
        return this._extratoAluguel;
    }

    public Adicionar(extratoAluguel: ExtratoAluguel): void {
        this._extratoAluguel.push(extratoAluguel);        
        this.CalculaVariacaoPatrimonial();
    }

    private CalculaVariacaoPatrimonial(): void {
        let index = this._extratoAluguel.length;
        if(index > 1) {
            let anterior = this._extratoAluguel[index-1].SaldoParcial();
            this._extratoAluguel[index].VariacaoPatrimonial = this._extratoAluguel[index].VariacaoPatrimonial - anterior;
        }        
    }
}

export class ExtratoAluguel {
    
    constructor(init?:Partial<ExtratoAluguel>) {
        Object.assign(this, init);
    }
    
    private _aluguel : number;
    public get Aluguel() : number {
        return this._aluguel;
    }
        
    private _rendimentoFundo : number;
    public get RendimentoFundo() : number {
        return this._rendimentoFundo;
    }
        
    private _depositoFundo : number;
    public get DepositoFundo() : number {
        return this._depositoFundo;
    }
    
    private _rendimentoFGTS : number;
    public get RendimentoFGTS() : number {
        return this._rendimentoFGTS;
    }
    
    private _depositoFGTS : number;
    public get DepositoFGTS() : number {
        return this._depositoFGTS;
    }

    public SaldoParcial(): number {
        return this._aluguel - this._depositoFundo - this._depositoFundo - this._rendimentoFGTS - this._depositoFGTS;
    }
    
    private _variacaoPatrimonial : number;
    public get VariacaoPatrimonial() : number {
        return this._variacaoPatrimonial;
    }
    public set VariacaoPatrimonial(v : number) {
        this._variacaoPatrimonial = v;
    }    
}