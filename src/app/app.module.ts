import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { HomeComponent } from './layout/home/home.component';

import { DescritivaComponent } from './restricted/descritiva/descritiva.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InsertComponent } from './restricted/descritiva/insert.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UploadCsvComponent } from './restricted/upload-csv/upload-csv.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';

import { ChartsModule } from 'ng2-charts';
import { ProbabilidadeComponent } from './restricted/probabilidade/probabilidade.component';
import { CorrelacaoComponent } from './restricted/correlacao/correlacao.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    HomeComponent,
    DescritivaComponent,
    AuthenticationComponent,
    InsertComponent,
    UploadCsvComponent,
    ProbabilidadeComponent,
    CorrelacaoComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatDialogModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatIconModule,
    MatProgressBarModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [InsertComponent]
})
export class AppModule { }
