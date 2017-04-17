import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoAluguelComponent } from './grafico-aluguel.component';

describe('GraficoAluguelComponent', () => {
  let component: GraficoAluguelComponent;
  let fixture: ComponentFixture<GraficoAluguelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoAluguelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoAluguelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
