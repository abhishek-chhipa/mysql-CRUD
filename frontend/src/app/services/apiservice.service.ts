import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  constructor(private _http: HttpClient) {}

  // Connect to the backend server

  apiURL = 'http://localhost:3000/user';

  // Get all users
  getUsers(): Observable<any> {
    return this._http.get(`${this.apiURL}`);
  }

  // Create users
  createUser(data: any): Observable<any> {
    console.log(data, 'creation api');

    return this._http.post(`${this.apiURL}`, data);
  }

  // DELETE USER
  deleteUser(id: any): Observable<any> {
    let gID = id;
    return this._http.delete(`${this.apiURL}/${gID} `);
  }

  // uPDATE USER INFO

  updateUser(id: any, data: any): Observable<any> {
    let gID = id;
    return this._http.put(`${this.apiURL}/${gID}`, data);
  }

  getSingleUser(id:any){
    let ids = id;
    return this._http.get(`${this.apiURL}/${ids}`);
  }
}
