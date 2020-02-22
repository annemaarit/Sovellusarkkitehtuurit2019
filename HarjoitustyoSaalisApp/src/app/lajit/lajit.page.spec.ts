import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LajitPage } from './lajit.page';

describe('LajitPage', () => {
  let component: LajitPage;
  let fixture: ComponentFixture<LajitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LajitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LajitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
