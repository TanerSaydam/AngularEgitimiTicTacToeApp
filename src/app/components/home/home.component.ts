import { AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicTacToeTableModel } from './model/tictactor-table.model';
import { DecodeService } from './service/decode.service';
import { SignalrService } from './service/signalr.service';
import { TableService } from './service/table.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'
]
})
export class HomeComponent implements OnInit, AfterContentChecked {

  userId: number = 0;    
  tables: TicTacToeTableModel[] = [];


  constructor(
    private _decode: DecodeService,    
    private _signalR: SignalrService,
    private _cdref: ChangeDetectorRef,
    private _table: TableService,
    private _router: Router
  ) {
    this.getUserId();
    this._signalR.start("https://angularegitimleriapi.ecnorow.com/tictactoe-hub")
   }

  ngAfterContentChecked(): void {
    this._cdref.detectChanges();
  }

  ngOnInit(): void {   
    this.getUserId(); 
     this._signalR.on("GetTableList", message => {        
        this.getList();
      });
    this.getList();
  }

  getUserId(){
    this.userId = this._decode.getUserId();    
  }

  getList(){
    this._table.getList().subscribe((res)=>{
      this.tables = res.data;      
    });
  } 

  createTable(){
    this._table.createTable(this.userId).subscribe((res)=>{
      this._router.navigateByUrl("/table/" + res.data);
    })
  }

  joinTable(table: TicTacToeTableModel){
    this._table.joinTable(table.id, this.userId).subscribe((res)=>{
      this._router.navigateByUrl("/table/" + table.id);
    })
  }
}
