import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriasDetallePage } from './crias-detalle.page';

describe('CriasDetallePage', () => {
  let component: CriasDetallePage;
  let fixture: ComponentFixture<CriasDetallePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CriasDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
