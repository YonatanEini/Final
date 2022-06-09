import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PandasGraphsComponent } from './pandas-graphs.component';

describe('PandasGraphsComponent', () => {
  let component: PandasGraphsComponent;
  let fixture: ComponentFixture<PandasGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PandasGraphsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PandasGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
