import {Usuario} from '../usuario';

export class UsuarioBuilder {
    
    public BuildRichUser(withFGTS = true): Usuario {        
        let user = this.createUser(700000, 250000, 360, 8000, new Date(1970,5,12), withFGTS, 80000, 0.05); 
        
        if(!withFGTS) {
            user.FGTS = 0;
        }
        
        return user;
    }

    public BuildPoorUser(withFGTS = true): Usuario {
        let user = this.createUser(160000, 20000, 420, 3000, new Date(1997, 2, 20), withFGTS, 12000, 0.12);

        if(!withFGTS) {
            user.FGTS = 0;
        }

        return user;
    }
    
    private createUser(
        valorImovel: number, 
        disponivel: number, 
        prestacoes: number,
        renda: number,
        nascimento: Date,
        usaFGTS: boolean,
        FGTS: number,
        crescimentoSalarial: number): Usuario{
        
        let usuario = new Usuario();
        usuario.valorImovel = valorImovel;
        usuario.disponivel = disponivel;
        usuario.prestacoes = prestacoes;
        usuario.renda = renda;
        usuario.nascimento = nascimento;
        usuario.usaFGTS = usaFGTS;
        usuario.FGTS = FGTS;
        usuario.crescimentoSalarial = crescimentoSalarial;
        
        return usuario;
    }
}