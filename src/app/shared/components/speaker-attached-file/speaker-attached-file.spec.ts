import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerAttachedFile } from './speaker-attached-file';

describe('SpeakerAttachedFile', () => {
  let component: SpeakerAttachedFile;
  let fixture: ComponentFixture<SpeakerAttachedFile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeakerAttachedFile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeakerAttachedFile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
