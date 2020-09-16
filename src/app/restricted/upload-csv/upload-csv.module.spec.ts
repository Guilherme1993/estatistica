import { UploadCsvModule } from './upload-csv.module';

describe('UploadCsvModule', () => {
  let uploadCsvModule: UploadCsvModule;

  beforeEach(() => {
    uploadCsvModule = new UploadCsvModule();
  });

  it('should create an instance', () => {
    expect(uploadCsvModule).toBeTruthy();
  });
});
