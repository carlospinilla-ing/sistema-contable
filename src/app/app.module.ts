import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TestListComponent } from './test-list/test-list.component';
import { AppRoutingModule } from './app-routing.module';
import { TestServiceService } from './test-service.service';

@NgModule({
  declarations: [
    AppComponent,
    TestListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TestServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
