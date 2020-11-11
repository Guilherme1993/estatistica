import { CorrelacaoModule } from './correlacao.module';

describe('CorrelacaoModule', () => {
  let correlacaoModule: CorrelacaoModule;

  beforeEach(() => {
    correlacaoModule = new CorrelacaoModule();
  });

  it('should create an instance', () => {
    expect(correlacaoModule).toBeTruthy();
  });
});
