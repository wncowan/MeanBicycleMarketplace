import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  register(new_user) {
    return this._http.post("/api/register", new_user);
  }
  login(user) {
    return this._http.post("/api/login", user);
  }
  logout() {
    return this._http.get("/api/logout");
  }
  getAllListings() {
    return this._http.get("/api/listings");
  }
  getRandomListing() {
    return this._http.get("/api/listings/random");
  }
  getUserListings() {
    return this._http.get("/api/listings/user");
  }
  createListing(new_listing) {
    return this._http.post("/api/listings", new_listing);
  }
  updateListing(listing) {
    return this._http.patch(`/api/listings/${listing._id}`, listing);
  }
  deleteListing(listing) {
    return this._http.delete(`/api/listings/${listing._id}`);
  }
  getOwner(listing) {
    return this._http.get(`/api/listings/${listing._id}`);
  }
}
