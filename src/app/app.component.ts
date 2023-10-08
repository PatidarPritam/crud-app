import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
//import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CoreService } from './core/core.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'crud-app';
  displayedColumns: string[] = [  // should be same as our api key like id, firstName..
  'id', 
  'firstName', 
  'lastName', 
  'email','dob','gender','education','experience','package',
   'action',

];
  dataSource!: MatTableDataSource<any>;   //dataSorce!

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

   constructor(private _dialog: MatDialog,private _empService:EmployeeService,private _coreService:CoreService){
    // this.dataSource = new MatTableDataSource  // 
   
   }

   openAddEditEmpForm(){
      // this._dialog.open(EmpAddEditComponent);

      const dialogRef= this._dialog.open(EmpAddEditComponent);
      dialogRef.afterClosed().subscribe({
        next: (val) =>{
          // console.log(val)
         if(val) {
            this.getEmployeeList();
          }
        }
      })

    }

    ngOnInit():void{
      this.getEmployeeList();
     }

   
    getEmployeeList(){

      this._empService.getEmployeeList().subscribe({
      
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
        // console.log(res)

      },
      error:console.log
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id:number){
  const confirmation = window.confirm('Are you sure you want to delete this employee?');
  
  if(confirmation){
    
    this._empService.getEmployeeDelete(id).subscribe({
    next:(res)=>{
        // alert('Employee deleted successfully')
        this._coreService.openSnackBar("Employee deleted successfully","done")
        this.getEmployeeList();

      },
      error:console.log
    })
   }
  }  
  openEditForm(data:any){
    const dialogRef=this._dialog.open(EmpAddEditComponent,{
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        // console.log(val)
       if(val) {
          this.getEmployeeList();
        }
      }
    })
  }

}

