import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionInfoMenuUi } from './exhibition-info-menu-ui';

describe('ExhibitionInfoMenuUi', () => {
  let component: ExhibitionInfoMenuUi;
  let fixture: ComponentFixture<ExhibitionInfoMenuUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitionInfoMenuUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhibitionInfoMenuUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
