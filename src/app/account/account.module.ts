import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { LoginComponent } from './login/login.component';
// import { CreateAccountComponent } from './create-account/create-account.component';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule
  ],
  declarations: [
    // LoginComponent, CreateAccountComponent
  ]
})
export class AccountModule { }
