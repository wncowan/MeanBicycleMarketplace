import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../http.service';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
  @Input() listing: any;
  @Input() owned: boolean;
  @Output() reloadEmitter = new EventEmitter;
  owner = {};

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  }
  getOwner() {
    this._httpService.getOwner(this.listing).subscribe(data => {
      if(data["message"] == "Success") {
        this.owner = data["data"];
        window.alert(`Name: ${this.owner['first_name']}\nEmail: ${this.owner['email']}`);
      }
    });
  }
  delete() {
    this._httpService.deleteListing(this.listing).subscribe(data => {
      if(data["message"] == "Success") {
        this.reloadEmitter.emit();
      }
    });
  }

}
