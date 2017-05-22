import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask'
import { FormularioComponent } from './formulario.component';
import { MyDatePickerModule } from 'mydatepicker';
import { MaskService} from '../../services/mask-service';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioComponent],
      imports: [FormsModule, MyDatePickerModule, TextMaskModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })
  
  it('should create an instance', () => {
    let maskService = new MaskService();
    let component = new FormularioComponent(maskService);
    expect(component).toBeTruthy();
  });
});
