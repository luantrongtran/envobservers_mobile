import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewDevicePage } from './new-device.page';

describe('NewDevicePage', () => {
  let component: NewDevicePage;
  let fixture: ComponentFixture<NewDevicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDevicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewDevicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
