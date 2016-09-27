import { Usuario } from './usuario';
import { FinanciamentoConfig } from './financiamento-config';

export class Financiamento {    
    
    public usuario: Usuario;
    public config: FinanciamentoConfig = new FinanciamentoConfig();

    constructor(usuario: Usuario) {
        this.usuario = usuario;
    }
    
    fdc(): void {
        alert(this.usuario.disponivel);        
    }

}
