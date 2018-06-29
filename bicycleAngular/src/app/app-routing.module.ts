import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowseComponent } from './logged/browse/browse.component';
import { ListingsComponent } from './logged/listings/listings.component';
import { ListingComponent } from './logged/browse/listing/listing.component';
import { EditListingComponent } from './logged/listings/edit-listing/edit-listing.component';
import { LogRegComponent } from './log-reg/log-reg.component';
import { LoggedComponent } from './logged/logged.component';

const routes: Routes = [
  {path: "", pathMatch: "full", component: LogRegComponent},
  {path: "", component: LoggedComponent, children: [
    {path: "listings", component: BrowseComponent},
    {path: "browse", component: ListingsComponent},
    {path: "**", redirectTo: "/"}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
