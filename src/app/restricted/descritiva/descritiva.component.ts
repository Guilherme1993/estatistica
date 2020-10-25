import { Component, OnInit } from '@angular/core';
import { InsertComponent } from './insert.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ChartOptions, ChartType, ChartDataSets, Chart } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Descritiva } from './descritiva.model';

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

  //BARRAS
  public barChartLabels1: any[] = [];

  public barChartType1: ChartType = 'bar';

  public barChartLegend1 = true;

  public barChartColors1 = [
    {
      backgroundColor: ['rgb(79, 72, 157)', 'rgb(79, 72, 157)', 'rgb(79, 72, 157)', 'rgb(79, 72, 157)'],
    },
  ];

  public barChartOptions1: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{ ticks: { beginAtZero: true } }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
      datasets: {
        barPercentage: 2
      }
    }
  };

  public barChartQuantDisc1: ChartDataSets[] = [
    { data: [0, 0, 0, 0], label: 'Quantitativa' }
  ];

  public insightChartReset1 = {
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
  public variable = '';
  public sum = 0;
  public descritivaObj = <Descritiva>{};
  public isCsv = false;
  public arr;

  public media = 0;
  public moda = [];
  public desvioPadrao = '0';
  public measureType = '';
  public selectedMeasure = 0;
  public selectedMeasureValue = 0;
  public calculatedMeasure = 0;
  public variationCo = '0';
  public median = '0';
  public valAux;
  public arrNum = [];
  public arrFi = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  public openCalcModal() {

    this.clean();

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

  public mountTable(result) {
    this.selectedType = result.varType;
    this.variable = result.varName;
    this.isCsv = result.isCsv;
    this.measureType = result.measureType;
    this.selectedMeasure = result.measure;
    this.selectedMeasureValue = result.measureValue;

    this.arr = result.arr;

    let valores;

    if (this.selectedType >= 3) {
      valores = result.arr;
      if (!this.isCsv) {
        valores = valores.replace(/;\s/g, ';');
        valores = this.arr.trim().split(";").map(Number);
      } else {
        valores = this.arr.trim().split(/\s*;\s*/).map(Number);
      }

      // if (this.selectedType != 4) {

      this.sortedVals = valores.sort((a, b) => a - b);

      // } else {
      if (this.selectedType == 4) {

        // this.valAux = valores;
        // this.valAux = this.valAux.sort((a, b) => a - b);
        this.valAux = this.sortedVals;

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
            // this.midPoints.push(tableInfo[i].midPoint * tableInfo[i].frequency)
            this.midPoints.push(tableInfo[i].midPoint)

            this.barChartLabels1.push(`${auxObj.min} |----- ${auxObj.max}`)
          }
        }
      }

      // SOMA TOTAL
      // this.totalSum = valores.reduce((a, b) => { return a + b });

      // var novaArr = this.sortedVals.filter((este, i) => this.sortedVals.indexOf(este) === i);

    } else {
      valores = result.arr;
      if (!this.isCsv) {
        // valores = valores.replace(/;\s/g, ';');
        valores = this.arr.split(";").map(String);
      } else {
        valores = this.arr.trim().split(/\s*;\s*/).map(String);
      }
      this.sortedVals = valores.sort()
    }

    valores = valores.map(Function.prototype.call, String.prototype.trim)

    console.log(valores)

    let obj = valores.reduce((object, item) => {

      if (!object[item]) {
        object[item] = 1;
      } else {
        object[item]++;
      }
      return object;
    }, {})

    this.arrNum = Object.keys(obj);
    this.arrFi = Object.values(obj);

    for (let i = 0; i < this.arrNum.length; i++) {
      let objData = { num: this.arrNum[i], fi: this.arrFi[i] };
      this.frequencyData.push(objData)
    }

    // if (this.selectedType >= 3) {
    //   this.barChartLabels = Object.keys(obj);
    //   let values = Object.values(obj);
    //   this.barChartQuantDisc = [
    //     { data: values, label: this.variable }
    //   ];

    //   for (let i = 0; i < values.length; i++) {
    //     this.descritivaObj.name = this.barChartLabels[i];
    //     // this.descritivaObj.fi = values[i]
    //   }

    // } else {

    //   this.pieChartLabels = Object.keys(obj);
    //   this.pieChartData = Object.values(obj);

    // }

    // if (this.selectedType >= 3) {
    //   let valores = result.arr;
    //   if (!this.isCsv) {
    //     valores = valores.replace(/;\s/g, ';');
    //     valores = this.arr.trim().split(";").map(Number);
    //   } else {
    //     valores = this.arr.trim().split(/\s*;\s*/).map(Number);
    //   }

    //   if (this.selectedType != 4) {
    //     this.sortedVals = valores.slice(0).sort((a, b) => {
    //       return parseInt(a || 0, 10) - parseInt(b || 0, 10);
    //     });
    //   } else {

    //     // this.sortedVals = valores.sort((a, b) => a - b);
    //     this.valAux = valores;
    //     this.valAux = this.valAux.sort((a, b) => a - b);

    //     let intervals = this.calcIntervals(valores);

    //     let tableInfo = intervals.map((interval) => {
    //       let min = interval.min, max = interval.max;

    //       return {
    //         midPoint: (min + max) / 2,
    //         frequency: valores.map((n) => {
    //           return (n < max && n >= min) ? 1 : 0;
    //         }).reduce((a, b) => {
    //           return a + b;
    //         })
    //       };
    //     });

    //     for (let i = 0; i < intervals.length; i++) {
    //       let auxObj = <any>{};
    //       if (tableInfo[i].frequency > 0) {
    //         auxObj.min = intervals[i].min
    //         auxObj.max = intervals[i].max
    //         auxObj.midPoint = tableInfo[i].midPoint;
    //         auxObj.fi = tableInfo[i].frequency;
    //         this.frequencyData.push(auxObj);
    //         // this.midPoints.push(tableInfo[i].midPoint * tableInfo[i].frequency)
    //         this.midPoints.push(tableInfo[i].midPoint)

    //         this.barChartLabels1.push(`${auxObj.min} |----- ${auxObj.max}`)
    //       }
    //     }
    //   }

    //   // SOMA TOTAL
    //   // this.totalSum = valores.reduce((a, b) => { return a + b });

    //   // var novaArr = this.sortedVals.filter((este, i) => this.sortedVals.indexOf(este) === i);

    // } else {
    //   let valores = result.arr;
    //   if (!this.isCsv) {
    //     // valores = valores.replace(/;\s/g, ';');
    //     valores = this.arr.split(";").map(String);
    //   } else {
    //     valores = this.arr.trim().split(/\s*;\s*/).map(String);
    //   }
    //   this.sortedVals = valores.sort()
    // }

    // console.log(obj)

    this.getFiPercent();
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

  public getFiPercent() {

    let total = this.arrFi.reduce((a, b) => a + b);

    this.frequencyData.forEach(p => {
      p.fiPercent = ((p.fi/total) * 100).toFixed(2);
    })

    // for (let i = 0; i < this.frequencyData.length; i++) {

    //   this.frequencyData[i].fiPercent = ((this.frequencyData[i].fi / total) * 100).toFixed(2);

    // }

    let auxData = []
    let auxColor = []

    if (this.selectedType == 3) {

      for (let i in this.frequencyData) {
        this.barChartLabels.push(this.frequencyData[i].num)

        auxData.push(this.frequencyData[i].fiPercent)

        auxColor.push('rgb(79, 72, 157)')
      }

      this.barChartColors = [
        {
          backgroundColor: auxColor,
        },
      ];

      this.barChartQuantDisc = [
        { data: auxData, label: `${this.variable} (%)` }
      ];
    } else if (this.selectedType < 3) {

      for (let i in this.frequencyData) {
        this.pieChartLabels.push(this.frequencyData[i].num)

        auxData.push(this.frequencyData[i].fiPercent)
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

    } else {

      for (let i in this.frequencyData) {

        auxData.push(this.frequencyData[i].fiPercent)

        auxColor.push('rgb(79, 72, 157)')

      }

      this.barChartColors1 = [
        {
          backgroundColor: auxColor,
        },
      ];

      this.barChartQuantDisc1 = [
        { data: auxData, label: `${this.variable} (%)`, barPercentage: 1.25 }
      ];
    }

    this.getFac()

  }

  public getFac() {

    this.frequencyData[0].fac = parseInt(this.frequencyData[0].fi)
    this.frequencyData[0].facPercent = parseFloat(this.frequencyData[0].fiPercent).toFixed(2);

    for (let i = 1; i < this.frequencyData.length; i++) {
      this.frequencyData[i].fac = parseInt(this.frequencyData[i].fi + this.frequencyData[i - 1].fac)
      this.frequencyData[i].facPercent = parseFloat(this.frequencyData[i].fiPercent) + parseFloat(this.frequencyData[i - 1].facPercent);
      this.frequencyData[i].facPercent = parseFloat(this.frequencyData[i].facPercent).toFixed(2);
    }

    let facTotal = parseInt(this.frequencyData[this.frequencyData.length - 1].facPercent);
    if (facTotal == 99) {
      this.frequencyData[this.frequencyData.length - 1].facPercent = parseFloat((facTotal + 1).toString()).toFixed();
    } else {
      this.frequencyData[this.frequencyData.length - 1].facPercent = parseFloat(facTotal.toString()).toFixed();
    }

    this.getModa();
  }

  public getModa() {
    let aux = 0
    //encontrar qual é a maior frequencia dentre as variaveis
    for (let i = 0; i < this.frequencyData.length; i++) {
      //se aux for menor que a frequencia

      if (this.frequencyData[aux].fi < this.frequencyData[i].fi) {
        //variavel aux guardará a posição do i
        aux = i
      }
    }
    //Verificar se há frequencias maiores iguais
    for (let i = 0; i < this.frequencyData.length; i++) {
      //verifico se existe outra posição com a mesma frequencia da maior
      if ((this.frequencyData[aux].fi == this.frequencyData[i].fi) && (this.selectedType == 4)) {
        this.moda.push(this.midPoints[i])
      }
      else
        if (this.frequencyData[aux].fi == this.frequencyData[i].fi) {
          //adiciono ao vetor MODA mais um elemento.
          this.moda.push(this.frequencyData[i].num)

        }
    }

    this.calcularMedia();
  }


  public calcularMedia() {
    let soma = 0;
    let freqTotal = this.frequencyData.length - 1

    if (this.selectedType == 3) {
      for (let i = 0; i < this.frequencyData.length; i++) {
        soma += (this.frequencyData[i].num) * (this.frequencyData[i].fi)
      }

      this.media = soma / (this.frequencyData[freqTotal].fac)
    }
    else if (this.selectedType == 4) {
      for (let i = 0; i < this.frequencyData.length; i++) {
        soma += (this.frequencyData[i].fi) * (this.frequencyData[i].midPoint)
      }

      this.media = soma / this.frequencyData[freqTotal].fac
    }
    this.desvioPad()

  }

  public desvioPad() {

    let media = this.media
    let frequenciaTotal = this.frequencyData[this.frequencyData.length - 1].fac
    let somaTotal = 0

    if (this.selectedType == 3) { //quantitativa discreta
      for (var i = 0; i < this.frequencyData.length; i++) {
        somaTotal += ((this.frequencyData[i].num - media) ** 2) * this.frequencyData[i].fi

      }

    } else if (this.selectedType == 4) { //quantitativa continua
      for (var i = 0; i < this.frequencyData.length; i++) {
        somaTotal += ((this.midPoints[i] - media) ** 2) * this.frequencyData[i].fi
      }
    }

    if (this.measureType == "Sample") {
      this.desvioPadrao = Math.sqrt(somaTotal / (frequenciaTotal - 1)).toFixed(2)

    }
    else {     //Population
      this.desvioPadrao = Math.sqrt(somaTotal / (frequenciaTotal)).toFixed(2)

    }

    let variacao = (Number(this.desvioPadrao) / media) * 100

    this.variationCo = parseFloat(variacao.toString()).toFixed(2);

    this.calcSeparatingMeasures();
  }

  public calcSeparatingMeasures() {

    let valorPorcentagem = 0;

    switch (this.selectedMeasure) {
      case 4:
        valorPorcentagem = this.selectedMeasureValue * 25;
        break;
      case 5:
        valorPorcentagem = this.selectedMeasureValue * 20;
        break;
      case 10:
        valorPorcentagem = this.selectedMeasureValue * 10;
        break;
      case 100:
        valorPorcentagem = this.selectedMeasureValue;
        break;
    }


    let posicao = (valorPorcentagem * this.frequencyData[this.frequencyData.length - 1].fac) / 100;

    if (this.selectedType != 4) {
      this.calculatedMeasure = this.sortedVals[Math.round(posicao) - 1]
    } else {
      this.calculatedMeasure = this.valAux[Math.round(posicao) - 1]
    }

    this.calcMedian();

  }

  public calcMedian() {

    if (this.selectedType < 4) {

      if (this.sortedVals.length % 2 === 0) {

        let meio = this.sortedVals.length / 2;
        let meio1 = this.sortedVals[meio - 1]
        let meio2 = this.sortedVals[meio];

        if (this.selectedType == 3) {
          let aux = (meio1 + meio2) / 2
          this.median = aux.toFixed(2);
        } else {

          this.median = meio1 + " e " + meio2
        }

      } else {
        let esq = 0;
        let dir = this.sortedVals.length - 1;
        let meio;
        meio = (esq + dir) / 2;

        if (this.selectedType == 3) {
          this.median = parseFloat(this.sortedVals[meio]).toFixed(2);
        } else {
          this.median = this.sortedVals[meio];
        }
      }

    } else {

      let meio;

      if (this.valAux.length % 2 === 0) {

        meio = (this.valAux.length / 2) - 1;

      } else {

        meio = (this.valAux.length - 1) / 2;

      }

      let pos = meio + 1;

      for (let i = 0; i < this.frequencyData.length; i++) {

        if (this.valAux[meio] > this.frequencyData[i].min && this.valAux[meio] < this.frequencyData[i].max) {
          let calcAux = (pos - this.frequencyData[i - 1].fac) / this.frequencyData[i].fi
          let interval = this.frequencyData[i].max - this.frequencyData[i].min
          this.median = this.frequencyData[i].min + (calcAux * interval)
        }
      }

    }

  }

  public clean() {
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.frequencyData = [];
    this.sortedVals = [];
    this.selectedType = 0;
    this.show = false;
    this.isCsv = false;
    this.variable = '';
    this.arr = '';
    this.media = 0;
    this.moda = [];
    this.desvioPadrao = '0';
    this.measureType = '';
    this.selectedMeasure = 0;
    this.selectedMeasureValue = 0;
    this.calculatedMeasure = 0;
    this.variationCo = '0';
    this.median = '0';

    this.barChartColors = [
      {
        backgroundColor: ['rgb(79, 72, 157)', 'rgb(79, 72, 157)', 'rgb(79, 72, 157)', 'rgb(79, 72, 157)'],
      },
    ];

    this.barChartQuantDisc = [
      { data: [0, 0, 0, 0], label: 'Quant. Discreta' }
    ];
  }
}
