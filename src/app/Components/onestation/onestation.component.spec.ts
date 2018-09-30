import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnestationComponent } from './onestation.component';
import { FormsModule } from '@angular/forms';

describe('OnestationComponent', () => {
  let component: OnestationComponent;
  let fixture: ComponentFixture<OnestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnestationComponent ]
      ,
      imports: [
        FormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
