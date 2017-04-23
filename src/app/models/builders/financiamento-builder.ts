import { Usuario } from '../usuario';
import { FinanciamentoConfig } from '../financiamento-config';
import { Financiamento } from '../financiamento';
import { FinanciamentoFgtsConfig } from '../financiamento-fgts-config';
import { FinanciamentoSeguro } from '../financiamento-seguro';
import { SeguradoraHdi } from '../seguradora-hdi';
import { FinanciamentoSemFgts } from '../financiamento-sem-fgts';
import { FinanciamentoFdc } from '../financiamento-fdc';
import {FinanciamentoFactory} from '../../utils/financiamento-factory';
import {UsuarioBuilder} from './usuario-builder';
import {GlobalConfiguration} from '../global-configuration';

export class FinanciamentoBuilder {
    private _financiamentoSemFgts : Financiamento;
    
    private criaParcelaFdc(prestacoes: number, primeiraParcela:number, acrescimo: number): Array<FinanciamentoFdc> {
        let fdcs: Array<FinanciamentoFdc> = Array<FinanciamentoFdc>();
        let parcela = primeiraParcela;
        let patrimonio = 100000;
        
        let fdc = new FinanciamentoFdc(null);
        fdc.patrimonio = patrimonio;
        fdcs.push(fdc);
        
        for(let i=1;i<=prestacoes;i++) {
            patrimonio += 100;
            let finFdc = new FinanciamentoFdc(null);
            finFdc.parcela = parcela;
            finFdc.patrimonio = patrimonio;
            parcela -= acrescimo;
            fdcs.push(finFdc);
        }

        return fdcs;
    }

    public GetFinanciamento(prestacoes: number, primeiraParcela: number, acrescimo: number): Financiamento {
        let usuario = new Usuario();
        usuario.GlobalConfiguration = new GlobalConfiguration();
        let config = this.criaFinanciamentoConfig();
        this._financiamentoSemFgts = new FinanciamentoSemFgts(usuario,config);
        this._financiamentoSemFgts.Prestacoes = this.criaParcelaFdc(prestacoes, primeiraParcela, acrescimo);
        return this._financiamentoSemFgts
    }

    public BuildRichUserWithFGTSFinanciamento(): Financiamento {
        let builder = new UsuarioBuilder();
        let user = builder.BuildRichUser();

        let fgtsConfig = new FinanciamentoFgtsConfig();
        fgtsConfig.Entrada = true;
        fgtsConfig.Posterior = 0;
        
        let finConfig = new FinanciamentoConfig(fgtsConfig);
        finConfig.Seguro = new FinanciamentoSeguro(new SeguradoraHdi());

        let factory = new FinanciamentoFactory(user, finConfig);
        let financiamento = factory.Create();
        financiamento.FluxoDeCaixa();
        financiamento.Id = 1;
        financiamento.Descricao = "Descricao tal";
        financiamento.Identificacao = "Financiamento de rico";
        return financiamento;
    }

    private criaFinanciamentoConfig(): FinanciamentoConfig {
        let usuario = new Usuario();
        let fgtsConfig = new FinanciamentoFgtsConfig();
        let financiamentoConfig = new FinanciamentoConfig(fgtsConfig);
        let seguro = new SeguradoraHdi();
        financiamentoConfig.Seguro = new FinanciamentoSeguro(seguro);
        financiamentoConfig.Seguro.Usuario = usuario;
        financiamentoConfig.Seguro.Calcular();
        return financiamentoConfig;
    }
}