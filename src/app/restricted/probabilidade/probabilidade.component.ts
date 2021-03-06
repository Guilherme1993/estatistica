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
  public valK;
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

    if (this.selectedType == 1) { //Distribuição Binomial

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

        let kValues;

        kValues = this.valK.trim().split(";").map(Number);

        if (kValues.length == 1) { //caso k só tenha um valor, calculo a probabilidade através da fórmula

          this.valProbabilidade = (this.valN / kValues[0]) * (this.valP ** kValues[0]) * (this.valQ ** (this.valN - kValues[0]))
          this.valProbabilidade = this.valProbabilidade * 100;
          this.valProbabilidade = parseFloat(this.valProbabilidade).toFixed(2);

        } else { //para k com mais de um valor, é necessário calcular através do fatorial para cada k
          let arrK = [];

          for (let k of kValues) {
            let auxK;
            if (k == 0) {
              auxK = 1 * (this.valP ** k) * (this.valQ ** (this.valN - k))
              auxK = auxK * 100;
            } else {
              let nFator = this.calculaFatorial(this.valN);
              let kFator = this.calculaFatorial(k);
              let diffFator = this.calculaFatorial(this.valN - k);

              auxK = (nFator / (kFator * diffFator)) * (this.valP ** k) * (this.valQ ** (this.valN - k))
              auxK = auxK * 100;
            }
            arrK.push(auxK);
          }
          this.valProbabilidade = this.somaVetor(arrK); // nesse caso, a probabilidade será a soma dos valores encontrados para cada k
          this.valProbabilidade = parseFloat(this.valProbabilidade).toFixed(2);
        }


      }

      this.valMedia = this.valN * this.valP;
      this.valMedia = parseFloat(this.valMedia).toFixed(2); //cálculo da média com resultado em 2 casas decimais
      let auxDP = this.valN * this.valP * this.valQ;
      this.valDP = Math.sqrt(auxDP);
      this.valDP = parseFloat(this.valDP).toFixed(2); //desvio padrão com resultado em 2 casas decimais
      this.valCV = (this.valDP / this.valMedia) * 100;
      this.valCV = parseFloat(this.valCV).toFixed(2); //coeficiente de variação com resultado em 2 casas decimais

    } else if (this.selectedType == 2) { //Distribuição Normal

      if (this.valMedia == null || this.valMedia == 0) {
        this.openSnackBar('É necessário inserir o valor da média para prosseguir', 'Campo Obrigatório');
        return null;
      }

      if (this.valDP == null || this.valDP == 0) {
        this.openSnackBar('É necessário inserir o valor do DP para prosseguir', 'Campo Obrigatório');
        return null;
      }

      if ((this.condMin == null || this.condMin == 0) && (this.condMax == null || this.condMax == 0)) {
        this.openSnackBar('É necessário selecionar uma condição para prosseguir', 'Campo Obrigatório');
        return null;
      }

      if (this.condMin != null && this.condMin > 0 && (this.qMin == null || this.qMin == 0)) {
        this.openSnackBar('É necessário inserir o valor mínimo para prosseguir', 'Campo Obrigatório');
        return null;
      }

      if (this.condMax != null && this.condMax > 0 && (this.qMax == null || this.qMax == 0)) {
        this.openSnackBar('É necessário inserir o valor máximo para prosseguir', 'Campo Obrigatório');
        return null;
      }

      let z1 = '0';
      let z2 = '0';

      let tabelaNormal = require('./../shared/tabela_normal'); //pego os dados da tabela da distribuição normal
      tabelaNormal = this.mergeSort(tabelaNormal, (a, b) => a.linha > b.linha) //ordeno a tabela baseando nos valores da linha

      if (this.condMin != null && this.condMin > 0 && this.qMin != this.valMedia) {

        let aux1 = (this.qMin - this.valMedia) / this.valDP;

        if (aux1 < 0) {
          aux1 = aux1 * (-1); //caso o valor encontrado seja negativo, deve-se deixá-lo positivo
        }

        z1 = parseFloat(aux1.toString()).toFixed(2); //valor calculado com 2 casas decimais

        let linha = z1.substring(0, 3);
        let coluna = "0.0" + z1.substring(3);

        let index = this.buscaBinaria(tabelaNormal, linha, coluna, this.comparaNome); //acho o índice do elemento, baseado no valor da linha e da coluna na tabela
        z1 = tabelaNormal[index].resultado;

      }

      if (this.condMax != null && this.condMax > 0 && this.qMax != this.valMedia) {

        let aux2 = (this.qMax - this.valMedia) / this.valDP;

        if (aux2 < 0) {
          aux2 = aux2 * (-1); //caso o valor encontrado seja negativo, deve-se deixá-lo positivo
        }

        z2 = parseFloat(aux2.toString()).toFixed(2); //valor calculado com 2 casas decimais

        let linha = z2.substring(0, 3);
        let coluna = "0.0" + z2.substring(3);

        let index = this.buscaBinaria(tabelaNormal, linha, coluna, this.comparaNome); //acho o índice do elemento, baseado no valor da linha e da coluna na tabela
        z2 = tabelaNormal[index].resultado;
      }

      if (this.condMin > 0 && this.condMax > 0) {

        if (this.qMin <= this.valMedia && this.qMax >= this.valMedia) {
          this.valProbabilidade = ((+z1 + +z2) * 100).toFixed(2); //a probabilidade será a soma dos dois valores, com resultado em duas casas decimais.
        } else if (+z1 > +z2) {
          this.valProbabilidade = ((+z1 - +z2) * 100).toFixed(2);
        } else {
          this.valProbabilidade = ((+z2 - +z1) * 100).toFixed(2);
        }

      } else if ((this.condMin == 1 && this.qMin < this.valMedia) || (this.condMin == 2 && this.qMin > this.valMedia)) {

        this.valProbabilidade = ((0.500 - +z1) * 100).toFixed(2);

      } else if ((this.condMin == 1 && this.qMin > this.valMedia) || (this.condMin == 2 && this.qMin < this.valMedia)) {

        this.valProbabilidade = ((0.500 + +z1) * 100).toFixed(2);

      } else {

        this.valProbabilidade = ((+z1 + +z2) * 100).toFixed(2);

      }

    } else { //Distribuição Uniforme

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
      this.valMedia = parseFloat(this.valMedia).toFixed(2); //cálculo da média com 2 casas decimais

      let intervalo;

      if (this.condMin == 1) {
        intervalo = this.qMin - this.vMin;
      } else {
        intervalo = this.vMax - this.qMin;
      }

      this.valProbabilidade = (1 / (this.vMax - this.vMin)) * intervalo;

      this.valProbabilidade = this.valProbabilidade * 100; //probabilidade (em porcentagem)

      this.valProbabilidade = parseFloat(this.valProbabilidade).toFixed(2);

      let auxDP = ((this.vMax - this.vMin) ** 2) / 12 //cálculo do desvio padrão
      this.valDP = Math.sqrt(auxDP);

      this.valDP = parseFloat(this.valDP).toFixed(2); //resultado do desvio padrão com 2 casas decimais

      this.valCV = (this.valDP / this.valMedia) * 100;

      this.valCV = parseFloat(this.valCV).toFixed(2); //coeficiente de variação com 2 casas decimais

    }

    this.showRes = true;
  }

  public calculaFatorial(valor) { //recebe um número e calcula o fatorial do mesmo

    let fator = 1;

    for (let i = 1; i <= valor; i++) {
      fator = fator * i;
    }

    return fator;

  }

  public clear() { //limpa os dados para novo cálculo
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

  public somaVetor(vet) { //realiza a soma dos valores em um vetor

    let soma = 0;

    for (let i = 0; i < vet.length; i++) {
      soma += vet[i];
    }

    return soma;
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

  public buscaBinaria(lista, valorLinha, valorColuna, fnComp, inicio = 0, fim = lista.length - 1) {
    //let inicio = 0
    //let fim = lista.length - 1  

    if (fim >= inicio) {
      // Math.floor(): retira as casas decimais de um número
      let meio = Math.floor((fim + inicio) / 2)

      let res = fnComp(lista[meio], valorLinha, valorColuna)

      // Verifica se o valor na posição média é o valor de busca
      if (res == 0) {
        return meio         // Condição de saída
      }
      else if (res < 0) {
        //fim = meio - 1
        return this.buscaBinaria(lista, valorLinha, valorColuna, fnComp, inicio, meio - 1)
      }
      else {  // res > 0
        //inicio = meio + 1
        return this.buscaBinaria(lista, valorLinha, valorColuna, fnComp, meio + 1, fim)
      }
    }
    // Condição de saída
    return -1       // Valor não encontrado

  }

  public comparaNome(obj, valorLinha, valorColuna) {
    // Os dois valores são iguais
    if (valorLinha === obj.linha) {
      if (valorColuna === obj.coluna) return 0
      else if (valorColuna < obj.coluna) return 1
      else return -1
    }
    // Um número negativo para indicar que o primeiro < segundo
    else if (valorLinha < obj.linha) return -1
    // Um número positivo para indicar que o primeiro > segundo
    else return 1 // valorBusca > obj.first_name
  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
