import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventdetailComponent } from './eventdetail.component';

describe('EventdetailComponent', () => {
  let component: EventdetailComponent;
  let fixture: ComponentFixture<EventdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
