import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MilltosecondsComponent } from './milltoseconds.component';

describe('MilltosecondsComponent', () => {
  let component: MilltosecondsComponent;
  let fixture: ComponentFixture<MilltosecondsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilltosecondsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MilltosecondsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
