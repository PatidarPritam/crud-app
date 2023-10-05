import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
//import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent {

  education: string[] = [
   'Matric',
   'Diploma',
   'Intermediate',
   'Graduate',
   'PostGraduate'
  ];

  empForm:FormGroup;// type define kiya he
    
    constructor(private _fb: FormBuilder, private _empService:EmployeeService,
      private _dialogRef: MatDialogRef<EmpAddEditComponent>){
      
    this.empForm = this._fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:'',

    })
  }
   ngOnInit(){}  
   onFormSubmit(){
    if(this.empForm.valid){
      console.log(this.empForm.value);
      this._empService.addEmployee(this.empForm.value).subscribe({
           
        next:(val:any)=>{
         alert('Employee added successfully');
         this._dialogRef.close(true);

       },
        error:(err:any)=>{
          console.log("error occur"+err);
          
        }

      })
    }
   }  

}
