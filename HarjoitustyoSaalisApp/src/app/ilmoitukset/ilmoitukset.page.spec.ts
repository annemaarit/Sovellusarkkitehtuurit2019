import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IlmoituksetPage } from './ilmoitukset.page';

describe('IlmoituksetPage', () => {
  let component: IlmoituksetPage;
  let fixture: ComponentFixture<IlmoituksetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IlmoituksetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IlmoituksetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
