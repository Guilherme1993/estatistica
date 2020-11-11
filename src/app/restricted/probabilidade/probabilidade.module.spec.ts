import { ProbabilidadeModule } from './probabilidade.module';

describe('ProbabilidadeModule', () => {
  let probabilidadeModule: ProbabilidadeModule;

  beforeEach(() => {
    probabilidadeModule = new ProbabilidadeModule();
  });

  it('should create an instance', () => {
    expect(probabilidadeModule).toBeTruthy();
  });
});
