import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowerfeedComponent } from './followerfeed.component';

describe('FollowerfeedComponent', () => {
  let component: FollowerfeedComponent;
  let fixture: ComponentFixture<FollowerfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowerfeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowerfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
