import {Usuario} from '../usuario';
import {FinanciamentoConfig, Seguradora} from '../financiamento-config';
import {FinanciamentoFgtsConfig, Posterior} from '../financiamento-fgts-config';
import {FinanciamentoSeguro} from '../financiamento-seguro';
import {IIdentifier} from '../i-identifier';

export class AdvancedProperties implements IIdentifier {

    constructor(usuario: Usuario, config: FinanciamentoConfig, fgtsConfig: FinanciamentoFgtsConfig, seguro: FinanciamentoSeguro) {
        this.receiveUser(usuario);
        this.receiveFinanciamentoConfig(config);
        this.receiveFgtsConfig(fgtsConfig);
    }

    public Id: number;
    public Identificacao: string;
    public Descricao: string;
    public ValorImovel: number;
    public Disponivel: number;    
    public Prestacoes: number;
    public UsaFgts: boolean;
    public Nascimento: Date;    
    public Renda: number;
    public Fgts: number;    
    public CrescimentoSalarial: number;
    public TaxaAdministrativa: number;
    public UsaComoEntrada: boolean;
    public Posterior: Posterior;
    public Seguradora: Seguradora

    private receiveUser(user: Usuario): void {
        this.ValorImovel = user.valorImovel;
        this.Disponivel = user.disponivel;
        this.Prestacoes = user.prestacoes;
        this.Nascimento = user.nascimento;
        this.UsaFgts = user.usaFGTS;
        this.Renda = user.renda;
    }

    private receiveFinanciamentoConfig(config: FinanciamentoConfig): void {
        this.TaxaAdministrativa = config.TaxaAdministrativa;
        this.Seguradora = config.Seguradora;
    }

    private receiveFgtsConfig(fgtsConfig: FinanciamentoFgtsConfig): void {
        this.CrescimentoSalarial = fgtsConfig.CrescimentoSalarial;
        this.UsaComoEntrada = fgtsConfig.Entrada;
        this.Fgts = fgtsConfig.Fgts;
        this.Posterior = fgtsConfig.Posterior;
    }
}