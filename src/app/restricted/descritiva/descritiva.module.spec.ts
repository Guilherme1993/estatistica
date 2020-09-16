import { DescritivaModule } from './descritiva.module';

describe('DescritivaModule', () => {
  let descritivaModule: DescritivaModule;

  beforeEach(() => {
    descritivaModule = new DescritivaModule();
  });

  it('should create an instance', () => {
    expect(descritivaModule).toBeTruthy();
  });
});
