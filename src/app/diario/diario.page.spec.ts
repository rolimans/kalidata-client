import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioPage } from './diario.page';

describe('DiarioPage', () => {
  let component: DiarioPage;
  let fixture: ComponentFixture<DiarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiarioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
