import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopvalikkoPage } from './popvalikko.page';

describe('PopvalikkoPage', () => {
  let component: PopvalikkoPage;
  let fixture: ComponentFixture<PopvalikkoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopvalikkoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopvalikkoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
