import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './models/emp.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  baseUrl = 'http://localhost:3000/posts';

  constructor(private http:HttpClient) { }

  getEmpData(){

    return this.http.get<Employee[]>(this.baseUrl)
  
  }
  postEmpData(Emp:Employee){
    return this.http.post<Employee[]>(this.baseUrl ,Employee)
  }
  deleteEmpData(id:string){
    return this.http.delete<Employee[]>(this.baseUrl + '/' + id)
  }
}
