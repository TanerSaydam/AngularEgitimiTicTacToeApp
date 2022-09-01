import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicTacToeTableModel } from '../model/tictactor-table.model';
import { DecodeService } from '../service/decode.service';
import { TableService } from '../service/table.service';
import { TableDetailModel } from './model/table-detail.model';
import { TableDetailService } from './service/table-detail.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  details: TableDetailModel[] = [];
  table: TicTacToeTableModel = new TicTacToeTableModel();

  tableId: string = "";
  userId: number = 0;

  yourNext: boolean = false;
  yourMark = "";

  constructor(
    private _activated: ActivatedRoute,
    private _tableDetail: TableDetailService,
    private _table: TableService,
    private _decode: DecodeService
  ) { }

  ngOnInit(): void {
    this.getUserId();

    this._activated.params.subscribe((res)=>{
      this.tableId = res["value"]
      this.getList();
    });
  }

  getUserId(){
    this.userId = this._decode.getUserId();
  }

  getList(){
    this._tableDetail.getListByTableId(this.tableId).subscribe((res)=>{
      this.details = res.data;      
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
  }

  markTable(detail: TableDetailModel){
    let model: any = {detailId: detail.id, value: this.yourMark}
    this._tableDetail.update(model).subscribe((res)=>{
      
    })
  }

}
