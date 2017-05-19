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