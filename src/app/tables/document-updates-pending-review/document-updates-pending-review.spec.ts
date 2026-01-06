import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentUpdatesPendingReview } from './document-updates-pending-review';

describe('DocumentUpdatesPendingReview', () => {
  let component: DocumentUpdatesPendingReview;
  let fixture: ComponentFixture<DocumentUpdatesPendingReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentUpdatesPendingReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentUpdatesPendingReview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
