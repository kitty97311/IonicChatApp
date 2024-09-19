import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriasPage } from './crias.page';

describe('CriasPage', () => {
  let component: CriasPage;
  let fixture: ComponentFixture<CriasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
