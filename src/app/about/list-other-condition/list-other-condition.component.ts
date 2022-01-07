import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TeamManagementService } from '../empleados/team-management.service';

@Component({
  selector: 'app-list-other-condition',
  templateUrl: './list-other-condition.component.html',
  styleUrls: ['./list-other-condition.component.css']
})
export class ListOtherConditionComponent implements OnInit {
  @Input()
  formGroup!:FormGroup
  @Input()
  isValidFormSubmitted!:string
  @Input()
  employees!:  FormArray
  allSkills!: Observable<any[]>;
  constructor(private teamMngService: TeamManagementService, private fb: FormBuilder, private readonly cdr: ChangeDetectorRef){
    this.allSkills = this.teamMngService.getSkills()
  }

  ngOnInit(): void {

  }
 
 
	addEmployee() {
		let fg = this.createEmpFormGroup();
		this.employees.push(fg);
	}
  deleteEmployee(idx: number) {
		this.employees.removeAt(idx);
	}
  createEmpFormGroup() {
		return this.fb.group({
			empName: ['', [Validators.required]],
			age: ['', [Validators.required]],
			skill: ['', [Validators.required]],
		})}

}
