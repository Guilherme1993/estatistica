import { Component, OnInit, Inject, Input } from '@angular/core';
import { Documents } from './documents.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss']
})
export class UploadCsvComponent implements OnInit {

  @Input() accept = '.csv';
  public files: Array<Documents> = [];
  public imageCheck = false;
  public documentUpload = false;
  public document;
  public arr;
  public varName = '';

  constructor(public snackBar: MatSnackBar) {
    this.document = [{}];
  }

  ngOnInit() {
  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 8000,
    });
  }

  public async changeListener(files: FileList){
    if(files && files.length > 0) {
       let file : File = files.item(0);
       console.log(file)
       this.varName = file.name;
       console.log(this.varName)
         let reader: FileReader = new FileReader();
         reader.readAsText(file);
         reader.onload = (e) => {
            let csv: string = reader.result as string;
            this.arr = csv;
            console.log(this.arr)
            this.result();
         } 
      }
  }

  public onSubmit(){
    console.log(this.arr)
  }

  private result(){
    console.log('última mensagem')
  }

}
