import { Usuario } from './usuario';
import { FinanciamentoFdc } from './financiamento-fdc';

export class Financiamento {    
    
    usuario: Usuario;
    prestacoes: FinanciamentoFdc[] = new Array();

    constructor(usuario: Usuario) {
        this.usuario = usuario;
    }
    
    vfdc: FinanciamentoFdc = new FinanciamentoFdc();
    
    fdc(): void {
        this.vfdc.setUsuario(this.usuario);
        for(var i=0; i<this.usuario.prestacoes;i++) {                    
            if(i == 0) {
                var copy = new FinanciamentoFdc();            
                copy.setProperties(this.vfdc);
                this.prestacoes.push(copy);
                continue;
            }
            
            this.vfdc.atualizar(i);
            var copy = new FinanciamentoFdc();            
            copy.setProperties(this.vfdc);
            this.prestacoes.push(copy);
        }
    }
}
