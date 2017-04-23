import { Component, OnInit } from '@angular/core';
import {GlobalConfiguration} from '../models/global-configuration';
import {ConfigurationService} from '../services/configuration-service';

@Component({
  selector: 'app-global-configuration',
  templateUrl: './global-configuration.component.html',
  styleUrls: ['./global-configuration.component.css'],
  providers: [ConfigurationService]
})
export class GlobalConfigurationComponent implements OnInit {

  private configuration: GlobalConfiguration;
  
  constructor(private conService: ConfigurationService) { }

  ngOnInit() {
    this.configuration = this.conService.Busca();
  }
}
