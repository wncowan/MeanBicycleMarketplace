import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  listings = [];
  error = null;

  constructor(
    private _httpService: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getListings();
  }

  getListings() {
    this._httpService.getUserListings().subscribe(data => {
      if(data["message"] == "auth_error") {
        this._router.navigate(["/"]);
      }
      else if(data["message"] == "Success") {
        this.listings = data["data"];
      }
      else {
        this.error = data["error"];
      }
    });
  }

  reloadFromChild(event) {
    this.getListings();
  }

}
