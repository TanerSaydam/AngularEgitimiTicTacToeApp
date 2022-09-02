import { Component, OnInit } from '@angular/core';
import { DecodeService } from '../home/service/decode.service';
import { AuthService } from '../login/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName: string = "";
  constructor(
    private _auth: AuthService,
    private _decode: DecodeService
  ) { }

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName(){
    this.userName = this._decode.getUserName()
  }

  logout(){
    this._auth.logout();
  }
}
