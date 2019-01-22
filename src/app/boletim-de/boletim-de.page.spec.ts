import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletimDePage } from './boletim-de.page';

describe('BoletimDePage', () => {
  let component: BoletimDePage;
  let fixture: ComponentFixture<BoletimDePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletimDePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletimDePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
