import {Usuario} from '../usuario';
import {GlobalConfiguration} from '../global-configuration';

export class UsuarioBuilder {
    
    public Build(valorImovel: number, disponivel: number, prestacoes: number, renda: number, withFGTS = true): Usuario {        
        let user = this.createUser(valorImovel, disponivel, prestacoes, renda, withFGTS);
        
        return user;
    }
    
    private createUser(
        valorImovel: number, 
        disponivel: number, 
        prestacoes: number,
        renda: number,
        usaFGTS: boolean): Usuario{
        
        let usuario = new Usuario();
        usuario.valorImovel = valorImovel;
        usuario.disponivel = disponivel;
        usuario.prestacoes = prestacoes;
        usuario.renda = renda;
        usuario.nascimento = new Date(1980,5,12);
        usuario.usaFGTS = usaFGTS;
        usuario.GlobalConfiguration = new GlobalConfiguration();
        
        return usuario;
    }
}