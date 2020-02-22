import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UutinenPage } from './uutinen.page';

describe('UutinenPage', () => {
  let component: UutinenPage;
  let fixture: ComponentFixture<UutinenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UutinenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UutinenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
