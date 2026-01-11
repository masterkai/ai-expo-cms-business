import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewUi } from './review-ui';

describe('ReviewUi', () => {
  let component: ReviewUi;
  let fixture: ComponentFixture<ReviewUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
