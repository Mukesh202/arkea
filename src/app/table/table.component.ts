import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../models/emp.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input()employee: Employee;
  @Output()onRemoveEmployee = new EventEmitter<number>();
  @Output()onEditEmployee = new EventEmitter<number>();
  
  displayedColumns: string[] = ['machine_number', 'serial_number'];

  constructor() {
    this.employee = {

      firstName: '',
      lastName:'',
      birthday:'',
      gender:'',
     companyLocation:'',
     phoneNumber:'',

    }
   }

  ngOnInit(): void {
    console.log(this.employee);
    
  }

  deleteEmployeeClicked(){
  this.onRemoveEmployee.emit(this.employee.id)
  // this.onRemoveEmployee.emit(this.employee.id)
  }
   editEmployeeClicked(){
    this.onEditEmployee.emit(this.employee.id);
   }
}
