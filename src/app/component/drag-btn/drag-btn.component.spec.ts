import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragBtnComponent } from './drag-btn.component';

describe('DragBtnComponent', () => {
  let component: DragBtnComponent;
  let fixture: ComponentFixture<DragBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DragBtnComponent]
    });
    fixture = TestBed.createComponent(DragBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
