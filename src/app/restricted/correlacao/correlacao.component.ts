import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-correlacao',
  templateUrl: './correlacao.component.html',
  styleUrls: ['./correlacao.component.css']
})
export class CorrelacaoComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Correlação' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  public showTable = false;
  public xI = 0;
  public yI = 0;
  public tableInfo = [];
  public totalX = 0;
  public totalY = 0;
  public totalXY = 0;
  public totalX2 = 0;
  public totalY2 = 0;
  public valR;
  public valA;
  public valB;
  public valX = 0;
  public valY;
  public showRes = false;
  public showY = false;
  public arrY = [];

  public dataSource = new MatTableDataSource();

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  public addValue() {

    if (this.xI == null || this.xI < 0) {
      this.openSnackBar('É necessário inserir o valor de Xi para prosseguir', 'Campo Obrigatório');
      return null;
    }

    if (this.yI == null || this.yI < 0) {
      this.openSnackBar('É necessário inserir o valor de Yi para prosseguir', 'Campo Obrigatório');
      return null;
    }

    this.showTable = true;

    let mult = this.xI * this.yI;
    let xI2 = this.xI ** 2;
    let yI2 = this.yI ** 2;

    let obj = { x: this.xI, y: this.yI, xy: mult, x2: xI2, y2: yI2 }
    this.tableInfo.push(obj);

    this.dataSource.connect();
    let data = this.dataSource.data;
    data.push(obj)
    if (data.length > 1) {
      data = this.mergeSort(data, (a, b) => a.x > b.x);
    }
    this.dataSource.data = data;
    this.dataSource.disconnect();
  }

  public getTotalX() {
    this.totalX = this.tableInfo.map(t => t.x).reduce((acc, value) => acc + value, 0);
    return this.totalX;
  }

  public getTotalY() {
    this.totalY = this.tableInfo.map(t => t.y).reduce((acc, value) => acc + value, 0);
    return this.totalY;
  }

  public getTotalXY() {
    this.totalXY = this.tableInfo.map(t => t.xy).reduce((acc, value) => acc + value, 0);
    return this.totalXY;
  }

  public getTotalX2() {
    this.totalX2 = this.tableInfo.map(t => t.x2).reduce((acc, value) => acc + value, 0);
    return this.totalX2;
  }

  public getTotalY2() {
    this.totalY2 = this.tableInfo.map(t => t.y2).reduce((acc, value) => acc + value, 0);
    return this.totalY2;
  }

  public calc() {

    this.tableInfo = this.mergeSort(this.tableInfo, (a, b) => a.x > b.x);

    this.tableInfo.forEach(p => {
      this.lineChartLabels.push(p.x);
      this.arrY.push(p.y);
    })

    this.lineChartData = [
      { data: this.arrY, label: 'Correlação' },
    ];

    let aux1 = (this.tableInfo.length * this.totalXY) - this.totalX * this.totalY;
    let aux2 = ((this.tableInfo.length * this.totalX2) - (this.totalX ** 2)) * ((this.tableInfo.length * this.totalY2) - (this.totalY ** 2));

    this.valR = aux1 / (Math.sqrt(aux2));

    if (this.valR > 0) {
      this.valR *= 100;
    } else {
      this.valR *= -100;
    }

    this.valR = parseFloat(this.valR).toFixed(2);

    let auxReg1 = (this.tableInfo.length * this.totalXY) - (this.totalX * this.totalY);
    let auxReg2 = (this.tableInfo.length * this.totalX2) - (this.totalX ** 2);

    this.valA = auxReg1 / auxReg2;

    this.valA = parseFloat(this.valA).toFixed(2);

    let auxY = this.totalY / this.tableInfo.length;
    let auxX = this.totalX / this.tableInfo.length;

    this.valB = auxY - (this.valA * auxX);

    this.valB = parseFloat(this.valB).toFixed(2);

    this.showRes = true;
  }

  public calcY() {
    this.valY = (this.valA * this.valX) + Number(this.valB);
    this.valY = parseFloat(this.valY).toFixed(2);
    this.showY = true;
  }

  public changeListener(files: FileList) {
    if (files && files.length > 0) {
      let file: File = files.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        let csv1 = csv.split("\n")

        let arrX = csv1[0].split(/\s*;\s*/)

        let arrY = csv1[1].split(/\s*;\s*/)

        for (let i = 0; i < arrX.length; i++) {
          this.xI = parseFloat(arrX[i])
          this.yI = parseFloat(arrY[i])
          this.addValue()
        }
      }
    }
  }

  public mergeSort(vetor, fnComp) {

    // Recebe dois vetores JÁ ORDENADOS PREVIAMENTE e os mescla
    // em um único vetor, também ORDENADO
    function mesclarVetores(vetEsq, vetDir) {
      let vetRes = [], posEsq = 0, posDir = 0, sobra

      while (posEsq < vetEsq.length && posDir < vetDir.length) {
        //if(vetEsq[posEsq] < vetDir[posDir]) {
        if (fnComp(vetDir[posDir], vetEsq[posEsq])) { // Parâmetros invertidos
          vetRes.push(vetEsq[posEsq])
          posEsq++
        }
        else { // vetDir[posDir] < vetEsq[posEsq]
          vetRes.push(vetDir[posDir])
          posDir++
        }
      }

      // Sobra no vetor da esquerda
      if (posEsq < posDir) sobra = vetEsq.slice(posEsq)
      // Sobra no vetor da direita
      else sobra = vetDir.slice(posDir)

      // A sobra é acrescentada ao resultado final
      return vetRes.concat(sobra)
    }

    if (vetor.length > 1) {
      // Encontra o meio do vetor
      let meio = Math.floor(vetor.length / 2)
      let vetEsq = vetor.slice(0, meio) // A posição do meio NÃO entra
      let vetDir = vetor.slice(meio)
      vetEsq = this.mergeSort(vetEsq, fnComp)
      vetDir = this.mergeSort(vetDir, fnComp)
      return mesclarVetores(vetEsq, vetDir)
    }
    return vetor
  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
