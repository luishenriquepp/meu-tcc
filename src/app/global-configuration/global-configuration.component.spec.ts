import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask'

import { GlobalConfigurationComponent } from './global-configuration.component';

describe('GlobalConfigurationComponent', () => {
  let component: GlobalConfigurationComponent;
  let fixture: ComponentFixture<GlobalConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalConfigurationComponent ],
      imports: [FormsModule, TextMaskModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
