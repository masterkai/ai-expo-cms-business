import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewUi } from './preview-ui';

describe('PreviewUi', () => {
  let component: PreviewUi;
  let fixture: ComponentFixture<PreviewUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
