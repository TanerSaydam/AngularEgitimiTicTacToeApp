import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TableDetailModel } from '../model/table-detail.model';

@Injectable({
  providedIn: 'root'
})
export class TableDetailService {

  apiUrl: string = environment.apiUrl;

  constructor(
    private _http: HttpClient
  ) { }

  getListByTableId(tableId: string){
    let api = this.apiUrl + "TicTacToeTableDetails/GetListByTableId/" + tableId;
    return this._http.get<any>(api);
  }

  update(model: TableDetailModel){
    let api = this.apiUrl + "TicTacToeTableDetails/Update";
    return this._http.post<any>(api,model);
  }

  newGame(tableId: string){
    let api = this.apiUrl + "TicTacToeTableDetails/NewGame/" + tableId;
    return this._http.get<any>(api);
  }
}
