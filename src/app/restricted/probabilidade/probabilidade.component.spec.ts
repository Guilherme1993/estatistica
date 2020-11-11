import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbabilidadeComponent } from './probabilidade.component';

describe('ProbabilidadeComponent', () => {
  let component: ProbabilidadeComponent;
  let fixture: ComponentFixture<ProbabilidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProbabilidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbabilidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
