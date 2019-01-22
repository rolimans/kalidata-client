import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineSignComponent } from './offline-sign.component';

describe('OfflineSignComponent', () => {
  let component: OfflineSignComponent;
  let fixture: ComponentFixture<OfflineSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflineSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
