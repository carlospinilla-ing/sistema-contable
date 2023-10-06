import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountService } from './components/config/service/account.service';
import { TransactionTypeService } from './components/config/service/transaction-type.service';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { NavbarComponent } from './components/general/navbar/navbar.component';
import { AccountComponent } from './components/config/account/account.component';
import { TransactionTypeComponent } from './components/config/transaction-type/transaction-type.component';
import { FormsModule } from '@angular/forms';
import { TransactionTypePipe } from './components/utils/pipes/transaction-type.pipe';
import { TransactionComponent } from './components/transaction/transaction/transaction.component';
import { TransactionService } from './components/transaction/service/transaction.service';
import { CurrencyPipe } from './components/utils/pipes/currency.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NavbarComponent,
    AccountComponent,
    TransactionTypeComponent,
    TransactionTypePipe,
    TransactionComponent,
    CurrencyPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [
    AccountService,
    TransactionTypeService,
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
