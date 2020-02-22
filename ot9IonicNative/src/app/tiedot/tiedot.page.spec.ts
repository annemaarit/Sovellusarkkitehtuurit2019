import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiedotPage } from './tiedot.page';

describe('TiedotPage', () => {
  let component: TiedotPage;
  let fixture: ComponentFixture<TiedotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiedotPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiedotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
