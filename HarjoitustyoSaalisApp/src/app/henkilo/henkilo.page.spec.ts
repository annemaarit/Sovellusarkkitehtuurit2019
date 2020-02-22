import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HenkiloPage } from './henkilo.page';

describe('HenkiloPage', () => {
  let component: HenkiloPage;
  let fixture: ComponentFixture<HenkiloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HenkiloPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HenkiloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
