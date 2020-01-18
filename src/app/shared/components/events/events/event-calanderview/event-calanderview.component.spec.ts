import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCalanderviewComponent } from './event-calanderview.component';

describe('EventCalanderviewComponent', () => {
  let component: EventCalanderviewComponent;
  let fixture: ComponentFixture<EventCalanderviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCalanderviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCalanderviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
