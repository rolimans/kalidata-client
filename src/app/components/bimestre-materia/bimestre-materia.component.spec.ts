import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BimestreMateriaComponent } from './bimestre-materia.component';

describe('BimestreMateriaComponent', () => {
  let component: BimestreMateriaComponent;
  let fixture: ComponentFixture<BimestreMateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BimestreMateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BimestreMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
