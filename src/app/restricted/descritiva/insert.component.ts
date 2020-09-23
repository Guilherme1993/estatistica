import { OnInit, Component, Inject, ViewChild, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadCsvComponent } from '../upload-csv/upload-csv.component';

@Component({
    selector: 'app-insert',
    templateUrl: './insert.component.html'
})
export class InsertComponent implements OnInit {

    @ViewChild('appUploadCsv') appUploadCsv: UploadCsvComponent;

    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    fourFormGroup: FormGroup;

    public width = '0';
    public selectedIndex = 0;
    public inputWay = 0;
    public arr;
    public variableName = '';
    public varTypes = [{ id: 1, name: 'Qualitativa Ordinal' }, { id: 2, name: 'Qualitativa Nominal' }, { id: 3, name: 'Quantitativa Discreta' }, { id: 4, name: 'Quantitativa Contínua' }]
    public measures = [{ id: 4, name: 'Quartil' }, { id: 5, name: 'Quintil' }, { id: 10, name: 'Decil' }, { id: 100, name: 'Percentil' }]
    public varType = 0;
    public selectedMeasure = 0;
    public selectedMeasureValue = 0;
    public measureOptions = [];
    public measureType = '';
    public isCsv = false;

    constructor(
        public dialogRef: MatDialogRef<InsertComponent>,
        @Inject(MAT_DIALOG_DATA) public data: InsertComponent,
        private _formBuilder: FormBuilder,
        public dialog: MatDialog,
        public snackBar: MatSnackBar) {

    }

    ngOnInit(): void {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
        this.thirdFormGroup = this._formBuilder.group({
            thirdCtrl: ['', Validators.required]
        });
        this.fourFormGroup = this._formBuilder.group({
            fourCtrl: ['', Validators.required]
        });

        this.width = localStorage.getItem('width');

        console.log(this.arr)
    }

    @HostListener('click', ['$event'])
    onClick(event) {

        if (event.target.id == 'btnSubmit') {

            console.log('deu certo aqui!')

            this.arr = this.appUploadCsv.arr;

            this.isCsv = true;

        }

    }

    public closeModal() {
        this.dialogRef.close(true);
    }

    public definePortions(item) {
        this.measureOptions = []

        for (let i = 1; i < item + 1; i++) {
            this.measureOptions.push(i);
        }

    }

    public openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 8000,
        });
    }

    public inputData(item) {
        this.inputWay = item;
    }

    public processData(event: any): void {
        if (event.selectedIndex == 2) {
            // this.arr = this.arr.trim().split(';')
        }
    }

    public calc() {

        let result = {
            varName: this.variableName,
            arr: this.arr,
            measure: this.selectedMeasure,
            measureValue: this.selectedMeasureValue,
            varType: this.varType,
            measureType: this.measureType,
            isCsv: this.isCsv
        }

        this.dialogRef.close(result);
    }
}