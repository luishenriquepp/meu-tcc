import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratoAluguelComponent } from './extrato-aluguel.component';

describe('ExtratoAluguelComponent', () => {
  let component: ExtratoAluguelComponent;
  let fixture: ComponentFixture<ExtratoAluguelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtratoAluguelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtratoAluguelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
