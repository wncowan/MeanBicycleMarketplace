import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  listings = [];
  user_listing_ids = [];
  error = null;

  constructor(
    private _httpService: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getListings();
  }

  getListings() {
    this._httpService.getAllListings().subscribe(data => {
      if(data["message"] == "auth_error") {
        this._router.navigate(["/"]);
      }
      else if(data["message"] == "Success") {
        this.getUserListingIds(data["data"]);
      }
      else {
        this.error = data["error"];
      }
    });
  }

  getUserListingIds(listings) {
    this._httpService.getUserListings().subscribe(data => {
      if(data["message"] == "Success") {
        this.user_listing_ids = data["data"].map(l => l["_id"]);
        this.listings = listings;
      }
    });
  }

  reloadFromChild(event) {
    this.getListings();
  }

}
