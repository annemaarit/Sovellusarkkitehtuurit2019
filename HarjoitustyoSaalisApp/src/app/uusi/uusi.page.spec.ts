import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UusiPage } from './uusi.page';

describe('UusiPage', () => {
  let component: UusiPage;
  let fixture: ComponentFixture<UusiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UusiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UusiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
