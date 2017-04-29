import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPicturesComponent } from './add-pictures.component';

describe('AddPicturesComponent', () => {
  let component: AddPicturesComponent;
  let fixture: ComponentFixture<AddPicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPicturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
