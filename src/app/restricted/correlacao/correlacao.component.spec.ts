import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrelacaoComponent } from './correlacao.component';

describe('CorrelacaoComponent', () => {
  let component: CorrelacaoComponent;
  let fixture: ComponentFixture<CorrelacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrelacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrelacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
