import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { HttpService } from './http.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowseComponent } from './logged/browse/browse.component';
import { ListingsComponent } from './logged/listings/listings.component';
import { ListingComponent } from './logged/browse/listing/listing.component';
import { EditListingComponent } from './logged/listings/edit-listing/edit-listing.component';
import { LogRegComponent } from './log-reg/log-reg.component';
import { LoggedComponent } from './logged/logged.component';

@NgModule({
  declarations: [
    AppComponent,
    BrowseComponent,
    ListingsComponent,
    ListingComponent,
    EditListingComponent,
    LogRegComponent,
    LoggedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
