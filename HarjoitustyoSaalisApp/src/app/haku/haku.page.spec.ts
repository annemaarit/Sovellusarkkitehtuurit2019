import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HakuPage } from './haku.page';

describe('HakuPage', () => {
  let component: HakuPage;
  let fixture: ComponentFixture<HakuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HakuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HakuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
