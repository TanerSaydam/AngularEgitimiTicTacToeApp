import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  apiUrl: string = environment.apiUrl;

  constructor(
    private _http: HttpClient
  ) { }

  getList(){
    let api = this.apiUrl + "TicTacToeTables/GetList";
    return this._http.get<any>(api);
  }

  createTable(userId: number){
    let api = this.apiUrl + "TicTacToeTables/CreateTable/" + userId;
    return this._http.get<any>(api)
  }

  joinTable(tableId: string, userId: number){
    let api = this.apiUrl + "TicTacToeTables/JoinTable/" + tableId + "/" + userId;
    return this._http.get<any>(api)
  }

  closeTable(tableId: string){
    let api = this.apiUrl + "TicTacToeTables/CloseTable/" + tableId;
    return this._http.get<any>(api)
  }

  getById(tableId: string){
    let api = this.apiUrl + "TicTacToeTables/GetById/" + tableId;
    return this._http.get<any>(api);
  }
}
