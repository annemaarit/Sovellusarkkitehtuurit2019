import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TekstitPage } from './tekstit.page';

describe('TekstitPage', () => {
  let component: TekstitPage;
  let fixture: ComponentFixture<TekstitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TekstitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TekstitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
