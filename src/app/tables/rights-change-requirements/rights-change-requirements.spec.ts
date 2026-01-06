import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightsChangeRequirements } from './rights-change-requirements';

describe('RightsChangeRequirements', () => {
  let component: RightsChangeRequirements;
  let fixture: ComponentFixture<RightsChangeRequirements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightsChangeRequirements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightsChangeRequirements);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
