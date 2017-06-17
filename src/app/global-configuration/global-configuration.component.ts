import { Component, OnInit } from '@angular/core';
import { PercentPipe } from '@angular/common';
import {GlobalConfiguration} from '../models/global-configuration';
import {MaskService} from '../services/mask-service';
import {ConfigurationRemoteService} from '../services/configuration-remote-service';
import {AuthService} from '../services/auth-service';

@Component({
  selector: 'app-global-configuration',
  templateUrl: './global-configuration.component.html',
  styleUrls: ['./global-configuration.component.css'],
  providers: [ConfigurationRemoteService, MaskService, PercentPipe]
})
export class GlobalConfigurationComponent implements OnInit {

  private configurations: Array<GlobalConfiguration>;
  private configuration: GlobalConfiguration = new GlobalConfiguration();
  private mask = this.maskService.percentMask;
  private Identificacao: string;
  private Descricao: string;
  private isAdicionado: boolean = false;
  
  constructor(
    private maskService: MaskService,
    private pipe: PercentPipe,
    private remoteService: ConfigurationRemoteService,
    private authService: AuthService,) { }

  ngOnInit(): void {
    let props = this.remoteService.BuscaTodos().subscribe((taxas) => {
      this.configurations = taxas as Array<GlobalConfiguration>;
    })
  }

  private adicionar(): void {
    this.configuration = new GlobalConfiguration();
    this.configuration.Identificacao = this.Identificacao;
    this.configuration.Descricao = this.Descricao;
    this.configuration.Referencial = this.maskService.ConvertToFloat(this.taxaReferencial);
    this.configuration.Interna = this.maskService.ConvertToFloat(this.taxaInterna);
    this.configuration.Aluguel = this.maskService.ConvertToFloat(this.taxaAluguel);
    this.configuration.Imovel = this.maskService.ConvertToFloat(this.taxaImovel);
    this.configuration.Fundo = this.maskService.ConvertToFloat(this.taxaFundo);
    this.configuration.Rentabilidade = this.maskService.ConvertToFloat(this.taxaRentabilidade);
    this.configuration.ImpostoRenda = this.maskService.ConvertToFloat(this.taxaImpostoRenda);
    this.configuration.Juros = this.maskService.ConvertToFloat(this.taxaJuros);
    this.remoteService.Salva(this.configuration);
    this.isAdicionado = true;
  }

  private onPropertyChange(value: GlobalConfiguration) {
    this.modelToViewModel(value);
  }

  private modelToViewModel(configuration: GlobalConfiguration): void {
      this.Identificacao = configuration.Identificacao;
      this.Descricao = configuration.Descricao;
      this.taxaReferencial = this.pipe.transform(configuration.Referencial);
      this.taxaInterna = this.pipe.transform(configuration.Interna);
      this.taxaAluguel = this.pipe.transform(configuration.Aluguel);
      this.taxaImovel = this.pipe.transform(configuration.Imovel);
      this.taxaFundo = this.pipe.transform(configuration.Fundo);
      this.taxaRentabilidade = this.pipe.transform(configuration.Rentabilidade);
      this.taxaImpostoRenda = this.pipe.transform(configuration.ImpostoRenda);
      this.taxaJuros = this.pipe.transform(configuration.Juros);
  }

  private taxaReferencial: string;
  public get TaxaReferencial(): string {
    return this.taxaReferencial;
  }
  public set TaxaReferencial(v: string) {
    this.taxaReferencial = v;
  }
  
  private taxaInterna: string;
  public get TaxaInterna(): string {
    return this.taxaInterna;
  }
  public set TaxaInterna(v: string) {
    this.taxaInterna = v;
  }

  private taxaAluguel: string;
  public get TaxaAluguel(): string {
    return this.taxaAluguel;
  }
  public set TaxaAluguel(v: string) {
    this.taxaAluguel = v;
  }

  private taxaImovel: string;
  public get TaxaImovel(): string {
    return this.taxaImovel;
  }
  public set TaxaImovel(v: string) {
    this.taxaImovel = v;
  }

  private taxaFundo: string;
  public get TaxaFundo(): string {
    return this.taxaFundo;
  }
  public set TaxaFundo(v: string) {
    this.taxaFundo = v;
  }

  private taxaRentabilidade: string;
  public get TaxaRentabilidade(): string {
    return this.taxaRentabilidade;
  }
  public set TaxaRentabilidade(v: string) {
    this.taxaRentabilidade = v;
  }

  private taxaImpostoRenda: string;
  public get TaxaImpostoRenda(): string {
    return this.taxaImpostoRenda;
  }
  public set TaxaImpostoRenda(v: string) {
    this.taxaImpostoRenda = v;
  }
  
  private taxaJuros: string;
  public get TaxaJuros(): string {
    return this.taxaJuros;
  }
  public set TaxaJuros(v: string) {
    this.taxaJuros = v;
  }

  private isValid(): boolean {
    if(!this.taxaAluguel || !this.taxaFundo || !this.taxaImovel || !this.taxaImpostoRenda || !this.taxaInterna || !this.taxaJuros || !this.taxaReferencial || !this.taxaRentabilidade) {
      return false;
    }
    return true;
  }
}