import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask'
import { FgtsPropriedadesComponent } from './fgts-propriedades.component';
import { MyDatePickerModule } from 'mydatepicker';
import { MaskService } from '../../services/mask-service';
import { PercentPipe } from '@angular/common';
import { FinanciamentoFgtsConfig } from '../../models/financiamento-fgts-config';

describe('FgtsPropriedadesComponent', () => {
  let component: FgtsPropriedadesComponent;
  let fixture: ComponentFixture<FgtsPropriedadesComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FgtsPropriedadesComponent],
      imports: [FormsModule, MyDatePickerModule, TextMaskModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgtsPropriedadesComponent);
    component = fixture.componentInstance;
    let fgtsConfig = new FinanciamentoFgtsConfig();
    component.fgtsConfig = fgtsConfig;
    fixture.detectChanges();
  })
  
  it('should create an instance', () => {
    let maskService = new MaskService();
    let percentPipe = new PercentPipe('');
    let component = new FgtsPropriedadesComponent(maskService, percentPipe);
    expect(component).toBeTruthy();
  });
});

