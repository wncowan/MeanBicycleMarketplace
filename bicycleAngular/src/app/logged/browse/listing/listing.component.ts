import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../http.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  @Input() listing: any;
  @Input() edit: boolean;
  @Output() reloadEmitter = new EventEmitter();
  error = null;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    if(!this.edit) {
      this.listing = {
        img_url: "",
        title: "",
        description: "",
        price: 1,
        location: ""
      }
    }
  }

  submit() {
    if(this.edit) {
      this.update();
    }
    else {
      this.create();
    }
  }

  update() {
    this._httpService.updateListing(this.listing).subscribe(data => {
      if(data["message"] == "Error") {
        this.error = data["error"];
      }
      else {
        this.error = null;
        this.reloadEmitter.emit();
      }
    });
  }
  delete() {
    this._httpService.deleteListing(this.listing).subscribe(data => {
      if(data["message"] == "Error") {
        this.error = data["error"];
      }
      else {
        this.error = null;
        this.reloadEmitter.emit();
      }
    });
  }
  create() {
    this._httpService.createListing(this.listing).subscribe(data => {
      if(data["message"] == "Success") {
        this.listing = {
          img_url: "",
          title: "",
          description: "",
          price: 1,
          location: ""
        }
        this.error = null;
        this.reloadEmitter.emit();
      }
      else {
        this.error = data["error"];
      }
    });
  }

}
