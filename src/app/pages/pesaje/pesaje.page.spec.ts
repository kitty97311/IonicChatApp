import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PesajePage } from './pesaje.page';

describe('PesajePage', () => {
  let component: PesajePage;
  let fixture: ComponentFixture<PesajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PesajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
