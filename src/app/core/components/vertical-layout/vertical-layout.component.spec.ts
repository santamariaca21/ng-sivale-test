import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VerticalLayoutComponent} from './vertical-layout.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('VerticalLayoutComponent', () => {
  let component: VerticalLayoutComponent;
  let fixture: ComponentFixture<VerticalLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerticalLayoutComponent],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
