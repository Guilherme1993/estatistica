import { Component, OnInit } from '@angular/core';
import { VideoEntity } from './videoteca-model';
import { DomSanitizer } from '@angular/platform-browser';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-videoteca',
  templateUrl: './videoteca.component.html',
  styleUrls: ['./videoteca.component.css']
})
export class VideotecaComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  public listVideos: VideoEntity[] = [];

  constructor(private sanitizer: DomSanitizer) {

    this.blockUI.start('Carregando...');

    this.listVideos.push(<VideoEntity>{
      title: 'Sobre o Analytica',
      url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/5j8nHi6Qsl0'),
    });

    this.listVideos.push(<VideoEntity>{
      title: 'Introdução - Estatística Descritiva',
      url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/97FpF0QE0Do'),
    });

    this.listVideos.push(<VideoEntity>{
      title: 'Distribuição de Frequências e Histogramas',
      url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/wu-ifas-1fg'),
    });

    this.listVideos.push(<VideoEntity>{
      title: 'Medidas de tendência central - parte 1',
      url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/6BL79i6QyoU'),
    });

    this.listVideos.push(<VideoEntity>{
      title: 'Medidas de Tendência Central - parte 2',
      url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/Q6JDRyT6my8'),
    });

    this.listVideos.push(<VideoEntity>{
      title: 'Medidas de Tendência Central - parte 3',
      url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/9CVXOZNYrM0'),
    });

    this.listVideos.push(<VideoEntity>{
      title: 'Medidas de dispersão - parte 1',
      url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/vIBIzEJFh60'),
    });

    this.listVideos.push(<VideoEntity>{
      title: 'Medidas de dispersão - parte 2',
      url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/oZyRUTYyluw'),
    });

    this.listVideos.push(<VideoEntity>{
      title: 'Medidas Separatrizes - parte 1',
      url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/CWVdARqguwY'),
    });

    this.listVideos.push(<VideoEntity>{
      title: 'Medidas Separatrizes - parte 2',
      url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/8j1u7kwpl6I'),
    });

    this.listVideos.push(<VideoEntity>{
      title: 'Distribuição Binomial - parte 1',
      url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/59negO0FYU8'),
    });

    this.listVideos.push(<VideoEntity>{
      title: 'Distribuição Binomial - parte 2',
      url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/L85ceCvbt5Y'),
    });

    this.listVideos.push(<VideoEntity>{
      title: 'Distribuição Normal - parte 1',
      url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/EfoU6JJuz7A'),
    });

    this.listVideos.push(<VideoEntity>{
      title: 'Distribuição Normal - parte 2',
      url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/K2fklBf8ejA'),
    });

    this.listVideos.push(<VideoEntity>{
      title: 'Distribuição Uniforme',
      url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/PQghxc2DT1A'),
    });

    this.listVideos.push(<VideoEntity>{
      title: 'Regressão Linear Simples',
      url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/IYxyCwB2NVA'),
    });

    this.listVideos.push(<VideoEntity>{
      title: 'Regressão Linear Múltipla',
      url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/8eEtz8gYZpA'),
    });

    this.blockUI.stop();
  }

  ngOnInit(): void {

  }

}
