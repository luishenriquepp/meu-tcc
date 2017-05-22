import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { FormularioAluguelComponent } from './formulario-aluguel.component';

describe('FormularioAluguelComponent', () => {
  let component: FormularioAluguelComponent;
  let fixture: ComponentFixture<FormularioAluguelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TextMaskModule],
      declarations: [ FormularioAluguelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAluguelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
