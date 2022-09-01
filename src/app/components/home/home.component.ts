import { AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TicTacToeUserModel } from './model/tictactoe-user.model';
import { DecodeService } from './service/decode.service';
import { SignalrService } from './service/signalr.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'
]
})
export class HomeComponent implements OnInit, AfterContentChecked {

  userId: number = 0;
  toUserId: number = 0;
  users: TicTacToeUserModel[] = [];  
  message: string = "";
  toUserName: string = "";
  toUserAvatar: string = "";
  filterText: string = "";
  fileUrl: string = environment.fileUrl;


  constructor(
    private _decode: DecodeService,    
    private _signalR: SignalrService,
    private _cdref: ChangeDetectorRef
  ) {
    this.getUserId();
    this._signalR.start("https://localhost:7146/chat-hub")
   }
  ngAfterContentChecked(): void {
    this._cdref.detectChanges();
  }

  ngOnInit(): void {    
    this._signalR.on("messageMethod", message => {
    })
  }

  getUserId(){
    this.userId = this._decode.getUserId();
  }
  

}
