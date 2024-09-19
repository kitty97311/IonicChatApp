import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PesajeDetallePage } from './pesaje-detalle.page';

describe('PesajeDetallePage', () => {
  let component: PesajeDetallePage;
  let fixture: ComponentFixture<PesajeDetallePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PesajeDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
