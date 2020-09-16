import { Component, OnInit } from '@angular/core';
import { InsertComponent } from './insert.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ChartOptions, ChartType, ChartDataSets, Chart } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-descritiva',
  templateUrl: './descritiva.component.html',
  styleUrls: ['./descritiva.component.css']
})
export class DescritivaComponent implements OnInit {

  //INICIO VARIAVEIS GRAFICOS

  //BARRAS
  public barChartLabels: any[] = [];

  public barChartType: ChartType = 'bar';

  public barChartLegend = true;

  public barChartColors = [
    {
      backgroundColor: ['rgb(79, 72, 157)', 'rgb(79, 72, 157)', 'rgb(79, 72, 157)', 'rgb(79, 72, 157)'],
    },
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{ ticks: { beginAtZero: true } }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartQuantDisc: ChartDataSets[] = [
    { data: [0, 0, 0, 0], label: 'Quantitativa' }
  ];

  public insightChartReset = {
    labelTable: 'Variável/Frequência',
    fi: 0
  };
  //FIM BARRAS

  // PIZZA
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: [],
    },
  ];
  // FIM PIZZA

  //FIM VARIAVEIS GRAFICOS

  public selectedType = 0;
  public sortedVals = [];
  public midPoints = [];
  public frequencyData = [];
  public show = false;
  // public barChartLabels = [];
  // public barChartColors = [];
  // public barChartQuantDisc = [];
  // public pieChartLabels = [];
  public variable = '';
  // public pieChartData = [];
  // public pieChartColors = [];
  public sum = 0;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  public openCalcModal() {

    const dialogRef = this.dialog.open(InsertComponent, {
      width: '90%',
      maxHeight: '500px',
      data: {
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.mountTable(result);
    });

  }

  public mountTable(result){
    this.selectedType = result.varType;
    this.variable = result.varName;

    let arr = result.arr;
    let obj = arr.reduce(function (object, item) {

      if (!object[item]) {
          object[item] = 1;
      } else {
          object[item]++;
      }
      return object;
  }, {})

  if (this.selectedType >= 3) {
    let valores = result.arr;
  //   if (!this.isCsv) {
  //   valores = this.arr.trim().split(/\s+/).map(Number);
  // } else {
  //   valores = this.arr.trim().split(/\s*;\s*/).map(Number);
  // }

    if (this.selectedType != 4) {
      this.sortedVals = valores.slice(0).sort((a, b) => {
        return parseInt(a || 0, 10) - parseInt(b || 0, 10);
      });
    } else {
      let intervals = this.calcIntervals(valores);

      let tableInfo = intervals.map((interval) => {
        let min = interval.min, max = interval.max;

        return {
          midPoint: (min + max) / 2,
          frequency: valores.map((n) => {
            return (n < max && n >= min) ? 1 : 0;
          }).reduce((a, b) => {
            return a + b;
          })
        };
      });

      for (let i = 0; i < intervals.length; i++) {
        let auxObj = <any>{};
        if (tableInfo[i].frequency > 0) {
          auxObj.min = intervals[i].min
          auxObj.max = intervals[i].max
          auxObj.midPoint = tableInfo[i].midPoint;
          auxObj.fi = tableInfo[i].frequency;
          this.frequencyData.push(auxObj);
          this.midPoints.push(tableInfo[i].midPoint * tableInfo[i].frequency)
        }
      }
    }

    // SOMA TOTAL
    // this.totalSum = valores.reduce((a, b) => { return a + b });

    // var novaArr = this.sortedVals.filter((este, i) => this.sortedVals.indexOf(este) === i);

  } else {
    let valores = result.arr;
    // if (!this.isCsv) {
    // valores = this.arr.trim().split(/\s+/).map(String);
    // } else {
    //   valores = this.arr.trim().split(/\s*;\s*/).map(String);
    // }
    this.sortedVals = valores.sort()
  }

  console.log(obj)

  let j = 1;
    let aux = {}

    for (let i = 0; i < this.sortedVals.length; i++) {

      aux = {};
      if (this.frequencyData.length == 0) {
        aux = { num: this.sortedVals[i], fi: 1 }
        this.frequencyData.push(aux);
      } else {
        if (this.sortedVals[i] == this.sortedVals[i - 1]) {
          this.frequencyData[this.frequencyData.length - 1].fi = j;
        } else {
          aux = { num: this.sortedVals[i], fi: 1 }
          this.frequencyData.push(aux);
          j = 1;
        }
      }
      j++;

    }

    let auxData = []
    let auxColor = []

    if (this.selectedType == 3) {

      for (let i in this.frequencyData) {
        this.barChartLabels.push(this.frequencyData[i].num)

        auxData.push(this.frequencyData[i].fi)

        auxColor.push('rgb(79, 72, 157)')
      }

      this.barChartColors = [
        {
          backgroundColor: auxColor,
        },
      ];

      this.barChartQuantDisc = [
        { data: auxData, label: this.variable }
      ];
    } else if (this.selectedType < 3) {

      for (let i in this.frequencyData) {
        this.pieChartLabels.push(this.frequencyData[i].num)

        auxData.push(this.frequencyData[i].fi)
      }

      this.pieChartData = auxData;

      switch (this.frequencyData.length) {
        case 1:
          auxColor = ['rgba(255,0,0,0.3)']
          break;
        case 2:
          auxColor = ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)']
          break;
        case 3:
          auxColor = ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)']
          break;
        case 4:
          auxColor = ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(120, 159, 201, 0.3)']
          break;
        case 5:
          auxColor = ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(120, 159, 201, 0.3)', 'rgba(255, 180, 82, 0.3)']
          break;
        case 6:
          auxColor = ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(120, 159, 201, 0.3)', 'rgba(255, 180, 82, 0.3)', 'rgba(245, 196, 0, 0.6)']
          break;
        case 7:
          auxColor = ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(120, 159, 201, 0.3)', 'rgba(255, 180, 82, 0.3)', 'rgba(245, 196, 0, 0.6)', 'rgba(127, 120, 92, 0.6)']
          break;
      }

      this.pieChartColors = [
        {
          backgroundColor: auxColor,
        },
      ];

    }

    this.calcFr(this.frequencyData);
    this.show = true;
  }

  public calcIntervals(vals) {
    let intervals = vals.slice(0).sort((a, b) => {
      return parseInt(a || 0, 10) - parseInt(b || 0, 10);
    });
    let maxNum = intervals[intervals.length - 1];
    let minNum = intervals[0];
    let groupCount = Math.round(1 + 3.22 * Math.log10(intervals.length));
    let groupLength = (maxNum - minNum) / groupCount;
    groupLength = groupLength + 1;
    //window.document.write(groupLength); 
    let result = [], n = minNum;

    for (let i = 0; i < groupCount; i++) {
      result[i] = { min: Math.round(n), max: Math.round(Math.min(n + groupLength)) }
      n += groupLength;
    }

    return result;
  }

  public calcFr(arr) {

    if (this.selectedType == 1) {
      this.frequencyData.sort(function(a,b) {
        return a.fi < b.fi ? -1 : a.fi > b.fi ? 1 : 0;
    });
    }

    this.sum = 0;
    for (let i in arr) {
      if (this.sum == 0) {
        this.sum = arr[i].fi
      } else {
        this.sum = this.sum + arr[i].fi
      }
    }
    this.getFac();
  }

  public getFac() {

    for (let i = 0; i < this.frequencyData.length; i++) {

      this.frequencyData[i].fiPercent = ((this.frequencyData[i].fi / this.sum) * 100).toFixed(2);

      if (i == 0) {
        this.frequencyData[i].fac = parseInt(this.frequencyData[i].fi)
      } else if (i > 0) {
        this.frequencyData[i].fac = parseInt(this.frequencyData[i].fi + this.frequencyData[i - 1].fac)
      }
    }

    this.getFacPercent();
  }

  public getFacPercent() {
    for (let i = 0; i < this.frequencyData.length; i++) {
      if (i == 0) {
        this.frequencyData[i].facPercent = parseFloat(this.frequencyData[i].fiPercent).toFixed(2);
      } else if (i > 0) {
        this.frequencyData[i].facPercent = parseFloat(this.frequencyData[i].fiPercent) + parseFloat(this.frequencyData[i - 1].facPercent);
        this.frequencyData[i].facPercent = parseFloat(this.frequencyData[i].facPercent).toFixed(2);
      }
    }

    this.frequencyData[this.frequencyData.length - 1].facPercent = parseFloat('100').toFixed(2);

    // if (this.selectedType == 3 || this.selectedType == 4) {
    //   this.getAverage();
    // } else {
    //   this.getMode();
    // }
  }

}
