import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseClientsViewComponent } from './choose-clients-view.component';

describe('ChooseClientsViewComponent', () => {
  let component: ChooseClientsViewComponent;
  let fixture: ComponentFixture<ChooseClientsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseClientsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseClientsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
