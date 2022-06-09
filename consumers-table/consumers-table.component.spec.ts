import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumersTableComponent } from './consumers-table.component';

describe('ConsumersTableComponent', () => {
  let component: ConsumersTableComponent;
  let fixture: ComponentFixture<ConsumersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
