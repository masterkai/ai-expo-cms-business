import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRadioGroup } from './review-radio-group';

describe('ReviewRadioGroup', () => {
  let component: ReviewRadioGroup;
  let fixture: ComponentFixture<ReviewRadioGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewRadioGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewRadioGroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
