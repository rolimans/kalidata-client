import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BimestreComponent } from './bimestre.component';

describe('BimestreComponent', () => {
  let component: BimestreComponent;
  let fixture: ComponentFixture<BimestreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BimestreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BimestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
