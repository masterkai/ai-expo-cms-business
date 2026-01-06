import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exhibitors } from './exhibitors';

describe('Exhibitors', () => {
  let component: Exhibitors;
  let fixture: ComponentFixture<Exhibitors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exhibitors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exhibitors);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
