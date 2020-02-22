import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsikatseluPage } from './esikatselu.page';

describe('EsikatseluPage', () => {
  let component: EsikatseluPage;
  let fixture: ComponentFixture<EsikatseluPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsikatseluPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsikatseluPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
