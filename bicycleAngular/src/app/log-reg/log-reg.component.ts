import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-reg',
  templateUrl: './log-reg.component.html',
  styleUrls: ['./log-reg.component.css']
})
export class LogRegComponent implements OnInit {
  log_user: any;
  reg_user: any;
  pass_conf: string;
  error = null;
  random_listing = null;

  constructor(
    private _httpService: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.log_user = {
      email: "",
      password: ""
    };
    this.reg_user = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    };
    this.getRandomListing();
  }

  register() {
    if(this.reg_user.password == this.pass_conf) {
      this._httpService.register(this.reg_user).subscribe(data => {
        if(data["message"] == "Success") {
          this._router.navigate(["/browse"]);
        }
        else {
          this.error = data["error"];
        }
      });
    }
  }

  login() {
    this._httpService.login(this.log_user).subscribe(data => {
      if(data["message"] == "Success") {
        this._router.navigate(["/browse"]);
      }
      else {
        this.error = data["error"];
      }
    });
  }

  getRandomListing() {
    this._httpService.getRandomListing().subscribe(data => {
      if(data["message"] == "Success") {
        this.random_listing = data["data"];
      }
    });
  }

}
