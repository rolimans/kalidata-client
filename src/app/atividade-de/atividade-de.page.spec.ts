import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeDePage } from './atividade-de.page';

describe('AtividadeDePage', () => {
  let component: AtividadeDePage;
  let fixture: ComponentFixture<AtividadeDePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtividadeDePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeDePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
