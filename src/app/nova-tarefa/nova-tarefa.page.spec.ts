import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaTarefaPage } from './nova-tarefa.page';

describe('NovaTarefaPage', () => {
  let component: NovaTarefaPage;
  let fixture: ComponentFixture<NovaTarefaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaTarefaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaTarefaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
