import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionRightsSettingProcess } from './exhibition-rights-setting-process';

describe('ExhibitionRightsSettingProcess', () => {
  let component: ExhibitionRightsSettingProcess;
  let fixture: ComponentFixture<ExhibitionRightsSettingProcess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitionRightsSettingProcess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhibitionRightsSettingProcess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
