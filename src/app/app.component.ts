import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from './models/emp.model';
import { TableService } from './table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('fileInput') fileInput:any;
  @ViewChild('addEmployeeButton') addEmployeeButton:any;
  title = 'assdm';
  empForm: FormGroup;
  employees: Employee[];
  employeesToDisplay: Employee[];
  empOptions = ['1a','2c','3s','8h','9k']
  name=+91
 

  constructor(private fb:FormBuilder ,private tableservice:TableService ){
    this.empForm = fb.group({});
    this.employees = [];
    this.employeesToDisplay  = this.employees;
  }
  ngOnInit():void{
    this.empForm = this.fb.group({
      firstName:this.fb.control(''),
      lastName:this.fb.control(''),
      birthday:this.fb.control(''),
      gender:this.fb.control(''),
      companyLocation:this.fb.control(''),
      phoneNumber:this.fb.control(''),
      salary:this.fb.control(''),
      //profile:this.fb.control('')
      
    });

    this.tableservice.getEmpData().subscribe(res=>{
      console.log(res);
      for(let emp of res) {
        this.employees.unshift(emp);
      }
      this.employeesToDisplay = this.employees;
    })
  
  }

ngAfterViewInit():void{
 //  this.buttontemp.nativeElement.click();  
}

clearForm(){
this.FirstName.setValue(''),
this.LastName.setValue(''),
this.Birthaday.setValue(''),
this.Gender.setValue(''),
this.CompanyLocation.setValue(''),
this.PhoneNumber.setValue(''),
this.Salary.setValue('')
//this.fileInput.nativeElement.value = '';

}

public get FirstName():FormControl {
  return this.empForm.get('firstName') as FormControl;
}
public get LastName():FormControl {
  return this.empForm.get('lastName') as FormControl;
}
public get Birthaday():FormControl {
  return this.empForm.get('birthday') as FormControl;
}
 public get Gender():FormControl {
   return this.empForm.get('gender') as FormControl;
 }
public get CompanyLocation():FormControl {
  return this.empForm.get('companyLocation') as FormControl;
}
public get PhoneNumber():FormControl {
  return this.empForm.get('phoneNumber') as FormControl;
}
public get Salary():FormControl {
  return this.empForm.get('salary') as FormControl;
}

addEmployee(){
  let employee: Employee= {

    firstName:this.FirstName.value,
    lastName:this.LastName.value,
    birthday:this.Birthaday.value,
    gender:this.Gender.value,
    companyLocation:this.CompanyLocation.value,
    phoneNumber:this.PhoneNumber.value,
    //salary:this.Salary.value,
   // profile:this.fileInput.nativeElement.files[0]?.name,
  }
  this.tableservice.postEmpData(employee).subscribe((res)=>{
    this.employees.unshift();
    this.clearForm();
  })
}


removeEmployee(event:any){
  this.employees.forEach((val,index)=>{
    if (val.id == parseInt(event)){
      this.tableservice.deleteEmpData(event).subscribe((res:any)=>{
        this.employees.splice(index,1)
      })
    }
  })
}

editEmployee(event:any){

  this.employees.forEach((val,ind)=>{
    if(val.id = event){
      this.setForm(val)
    }
  })

  this.removeEmployee(event);
  this.addEmployeeButton.nativeElement.click()


}

setForm(emp:Employee){
  this.FirstName.setValue(emp.firstName);
  this.LastName.setValue(emp.lastName);
  this.Birthaday.setValue(emp.birthday);
  this.CompanyLocation.setValue(emp.companyLocation);
  this.PhoneNumber.setValue(emp.phoneNumber);
  this.Gender.setValue(emp.gender)
}





}

