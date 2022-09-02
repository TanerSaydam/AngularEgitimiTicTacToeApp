import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TicTacToeTableModel } from '../model/tictactor-table.model';
import { DecodeService } from '../service/decode.service';
import { SignalrService } from '../service/signalr.service';
import { TableService } from '../service/table.service';
import { TableDetailModel } from './model/table-detail.model';
import { WinnerModel } from './model/winner.model';
import { TableDetailService } from './service/table-detail.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, OnDestroy {

  details: TableDetailModel[] = [];
  table: TicTacToeTableModel = new TicTacToeTableModel();

  tableId: string = "";
  userId: number = 0;

  yourNext: boolean = false;
  yourMark = "X";

  winner = new WinnerModel();
  markColumn = 0;

  constructor(
    private _activated: ActivatedRoute,
    private _tableDetail: TableDetailService,
    private _table: TableService,
    private _decode: DecodeService,
    private _router: Router,
    private _signalR: SignalrService
  ) {
    this._signalR.start("https://angularegitimleriapi.ecnorow.com/tictactoe-hub")
    //this._signalR.start("https://localhost:7146/tictactoe-hub")
   }

  canDeactive(): boolean {
    return confirm('Oyundan ayrılmak istiyor musunuz');
  }

  ngOnDestroy(): void {
    console.log("çalıştım")
    this.closeTable();
  }

  ngOnInit(): void {
    this.getUserId();

    this._activated.params.subscribe((res)=>{
      this.tableId = res["value"]
      this.getList();

      this._signalR.on("GetTableDetailList", res =>{
        if (res != null || res != undefined) {
          this.winner = res
        }
        this.getList();
      });
    });
  }

  getUserId(){
    this.userId = this._decode.getUserId();
  }

  getList(){
    this._tableDetail.getListByTableId(this.tableId).subscribe((res)=>{
      this.details = res.data;     
      this.markColumn = this.details.filter(p=> p.value != "").length; 
      this.getTable(res.data[0].tableId);
    })
  }

  getTable(tableId: string){
    this._table.getById(tableId).subscribe((res)=>{
      this.table = res.data;
      this.setNextPlayer();
    },(err)=>{
      console.log(err);
    })
  }

  setYourMark(){
    if (this.table.userId == this.userId) {
      this.yourMark = "X"
    }else{
      this.yourMark = "O"
    }
  }

  setNextPlayer(){
    let count = this.details.filter(p=> p.value != "").length;    
    if (this.table.userId == this.userId) {
      if (count % 2 == 0) {
        this.yourNext = true;
      }else{
        this.yourNext = false;
      }
    }else{
      if (count % 2 == 0) {
        this.yourNext = false;
      }else{
        this.yourNext = true;
      }
    }  
    
    this.setYourMark()
  }

  markTable(detail: TableDetailModel){
    detail.value = this.yourMark;
    this._tableDetail.update(detail).subscribe((res)=>{
      
    },(err)=>{
      detail.value = "";
    })
  }

  closeTable(){
    this._table.closeTable(this.table.id).subscribe((res)=> {
      this._router.navigateByUrl("/");
    })
  }

  checkOutForWinnerColumn(detail: TableDetailModel){
    if (this.winner.winnerName != "") {
      if (detail.id == this.winner.winnerColumn1 || detail.id == this.winner.winnerColumn2 || detail.id == this.winner.winnerColumn3) {
        return "btn btn-success"
      }
    }
    return "btn btn-default"
  }

  
}
