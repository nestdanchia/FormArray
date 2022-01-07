import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
//if (this.formArray.length === 0)
    //  this.addItem();
  }
  get teamName() {
		return this.formGroup.get('teamName');
	}
  /*
	get employees(): FormArray {
		return this.formGroup.get('employees') as FormArray;
	}*/
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
			age: ['', [Validators.required, Validators.min(21)]],
			skill: ['', [Validators.required]],
		})}
/*
  get formArray():FormArray {
    return this.formGroup!.get(this.arrayName)! as FormArray
  }*/
/*
  addItem() {
    this.formArray.push(this.initItem())
  }
  removeItem(i:number) {
    this.formArray.removeAt(i)
    if (this.formArray.length === 0)
      this.formArray.push(this.initItem())
  }*/
/*
  public initItem = () : FormGroup =>
    this.fb.group({
      diagnosis: this.fb.control(null, Validators.required),
      year: this.fb.control(null, Validators.required)
    })*/
}
