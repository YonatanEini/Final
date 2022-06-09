import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphsComponentComponent } from './graphs-component.component';

describe('GraphsComponentComponent', () => {
  let component: GraphsComponentComponent;
  let fixture: ComponentFixture<GraphsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
