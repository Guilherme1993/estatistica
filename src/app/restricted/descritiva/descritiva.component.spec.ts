import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescritivaComponent } from './descritiva.component';

describe('DescritivaComponent', () => {
  let component: DescritivaComponent;
  let fixture: ComponentFixture<DescritivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescritivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescritivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
