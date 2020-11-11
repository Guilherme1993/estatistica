import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-probabilidade',
  templateUrl: './probabilidade.component.html',
  styleUrls: ['./probabilidade.component.css']
})
export class ProbabilidadeComponent implements OnInit {

  public types = [{ id: 1, name: 'Distribuição Binomial' }, { id: 2, name: 'Distribuição Normal' }, { id: 3, name: 'Distribuição Uniforme' }]
  public condicoes = [{ id: 1, name: 'Menos que' }, { id: 2, name: 'Mais que' }]
  public selectedType = 0;
  public valN = 0;
  public valP = 0;
  public valQ = 0;
  public valK = 0;
  public valMedia;
  public valDP;
  public valProbabilidade;
  public valCV;
  public vMin = 0;
  public vMax = 0;
  public condMin = 0;
  public condMax = 0;
  public qMin = 0;
  public qMax = 0;
  public showRes = false;

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  public calcular() {

    if (this.selectedType == 1) {
      console.log("entrou aqui")

      if (this.valN == null || this.valN == 0) {
        this.openSnackBar('É necessário inserir o valor de n para prosseguir', 'Campo Obrigatório');
        return null;
      }

      if (this.valP == null || this.valP == 0) {
        this.openSnackBar('É necessário inserir o valor de p para prosseguir', 'Campo Obrigatório');
        return null;
      }

      if (this.valQ == null || this.valQ == 0) {
        this.openSnackBar('É necessário inserir o valor de q para prosseguir', 'Campo Obrigatório');
        return null;
      }

      if (this.valK == null || this.valK == 0) {
        this.openSnackBar('É necessário inserir o valor de k para prosseguir', 'Campo Obrigatório');
        return null;
      } else {
        this.valProbabilidade = (this.valN / this.valK) * (this.valP ** this.valK) * (this.valQ ** (this.valN - this.valK))
        this.valProbabilidade = this.valProbabilidade * 100;
        this.valProbabilidade = parseFloat(this.valProbabilidade).toFixed(2);

        console.log("Probabilidade: " + this.valProbabilidade);
      } 
      // else {
      //   let arrK = [];

      //   console.log("Entrou no else")

      //   for (let k = 0; k <= this.valK; k++) {
      //     let auxK;
      //     if (k == 0) {
      //       auxK = 1 * (this.valP ** k) * (this.valQ ** (this.valN - k))
      //       auxK = auxK * 100;
      //     } else {
      //       auxK = (this.valN / k) * (this.valP ** k) * (this.valQ ** (this.valN - k))
      //       auxK = auxK * 100;
      //     } 
      //     // else {
      //     //   let nFator = this.calculaFatorial(this.valN);
      //     //   let kFator = this.calculaFatorial(k);
      //     //   let diffFator = this.calculaFatorial(this.valN - k);

      //     //   auxK = (nFator / (kFator * diffFator)) * (this.valP ** k) * (this.valQ ** (this.valN - k))
      //     //   auxK = auxK * 100;
      //     // }
      //     arrK.push(auxK);
      //   }
      //   this.valProbabilidade = this.somaVetor(arrK);
      //   this.valProbabilidade = parseFloat(this.valProbabilidade).toFixed(2);
      //   console.log("Probabilidade: " + this.valProbabilidade);
      // }

      this.valMedia = this.valN * this.valP;
      this.valMedia = parseFloat(this.valMedia).toFixed(2);
      console.log("Média: " + this.valMedia);
      let auxDP = this.valN * this.valP * this.valQ;
      this.valDP = Math.sqrt(auxDP);
      this.valDP = parseFloat(this.valDP).toFixed(2);
      console.log("Desvio Padrão: " + this.valDP);
      this.valCV = (this.valDP / this.valMedia) * 100;
      this.valCV = parseFloat(this.valCV).toFixed(2);
      console.log("Coeficiente de Variância: " + this.valCV);

    } else if (this.selectedType == 2) {

    } else if (this.selectedType == 3) {

      console.log("Valor mínimo: " + this.vMin);
      console.log("Valor máximo: " + this.vMax);
      console.log("q mínimo: " + this.qMin);
      // console.log("q máximo: " + this.qMax);
      console.log("Condição mínima: " + this.condMin);
      // console.log("Condição máxima: " + this.condMax);

      if (this.vMin == null || this.vMin == 0) {
        this.openSnackBar('É necessário inserir o valor mínimo para prosseguir', 'Campo Obrigatório');
        return null;
      }

      if (this.vMax == null || this.vMax == 0) {
        this.openSnackBar('É necessário inserir o valor máximo para prosseguir', 'Campo Obrigatório');
        return null;
      }

      if (this.condMin == null || this.condMin == 0) {
        this.openSnackBar('É necessário selecionar uma condição para prosseguir', 'Campo Obrigatório');
        return null;
      }

      if (this.qMin == null || this.qMin == 0) {
        this.openSnackBar('É necessário inserir o valor de q para prosseguir', 'Campo Obrigatório');
        return null;
      }

      this.valMedia = (this.vMin + this.vMax) / 2;
      this.valMedia = parseFloat(this.valMedia).toFixed(2);
      console.log("media: " + this.valMedia);

      let intervalo;

      if (this.condMin == 1) {
        intervalo = this.qMin - this.vMin;
      } else {
        intervalo = this.vMax - this.qMin;
      }

      console.log("Intervalo: " + intervalo);

      this.valProbabilidade = (1 / (this.vMax - this.vMin)) * intervalo;

      console.log("Probabilidade: " + this.valProbabilidade);

      this.valProbabilidade = this.valProbabilidade * 100;

      this.valProbabilidade = parseFloat(this.valProbabilidade).toFixed(2);

      let auxDP = ((this.vMax - this.vMin) ** 2) / 12
      this.valDP = Math.sqrt(auxDP);

      this.valDP = parseFloat(this.valDP).toFixed(2);

      console.log("Desvio Padrão: " + this.valDP);

      this.valCV = (this.valDP / this.valMedia) * 100;

      this.valCV = parseFloat(this.valCV).toFixed(2);

      console.log("Coeficiente de variância: " + this.valCV);
    }

    this.showRes = true;
  }

  public calculaFatorial(valor) {

    let fator = 1;

    for (let i = 1; i <= valor; i++) {
      fator = fator * i;
    }

    return fator;

  }

  public clear() {
    this.showRes = false;
    this.valN = 0;
    this.valP = 0;
    this.valQ = 0;
    this.valK = 0;
    this.valMedia = 0;
    this.valDP = 0;
    this.valProbabilidade;
    this.valCV;
    this.vMin = 0;
    this.vMax = 0;
    this.condMin = 0;
    this.condMax = 0;
    this.qMin = 0;
    this.qMax = 0;
  }

  public somaVetor(vet) {

    let soma = 0;

    for (let i = 0; i < vet.length; i++) {
      soma += vet[i];
    }

    return soma;
  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
