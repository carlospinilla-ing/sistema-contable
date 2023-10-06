import { NgModule } from '@angular/core';
import { Routes,RouterModule  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './components/config/account/account.component';
import { TransactionTypeComponent } from './components/config/transaction-type/transaction-type.component';
import { TransactionComponent } from './components/transaction/transaction/transaction.component';

const routes: Routes = [
  { path:'transaction', component: TransactionComponent },
  { path:'account', component: AccountComponent },
  { path:'transaction-type', component: TransactionTypeComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
