import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionInfoPreviewUi } from './exhibition-info-preview-ui';

describe('ExhibitionInfoPreviewUi', () => {
  let component: ExhibitionInfoPreviewUi;
  let fixture: ComponentFixture<ExhibitionInfoPreviewUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitionInfoPreviewUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhibitionInfoPreviewUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
