import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateClientsComponent } from './activate-clients.component';

describe('ActivateClientsComponent', () => {
  let component: ActivateClientsComponent;
  let fixture: ComponentFixture<ActivateClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
