import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
//import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
//import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

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
      private _dialogRef: MatDialogRef<EmpAddEditComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any,
      private _coreService:CoreService){
      
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
   ngOnInit(){
    this.empForm.patchValue(this.data)
   }  
   onFormSubmit(){

    const formControls = this.empForm.controls;
    const isAnyFieldEmpty = Object.keys(formControls).some(key => !formControls[key].value);

    if (isAnyFieldEmpty) {
      // Display a snackbar message
      this._coreService.openSnackBar('Please fill in all the fields', 'Close')
    } else if(this.empForm.valid){
        if(this.data){
          this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
           
          next:(val:any)=>{
          
            this._coreService.openSnackBar('Employee updated successfully')
          //  alert('Employee added successfully');
           this._dialogRef.close(true);
  
         },
          error:(err:any)=>{
            console.log("error occur"+err);
            
          }
  
        })
        
      }else{

        //console.log(this.empForm.value);
      this._empService.addEmployee(this.empForm.value).subscribe({
           
        next:(val:any)=>{
        
          this._coreService.openSnackBar('Employee added successfully')
        //  alert('Employee added successfully');
         this._dialogRef.close(true);

       },
        error:(err:any)=>{
          console.log("error occur"+err);
          
        }

      })

      }

      
    }
   }  

}
