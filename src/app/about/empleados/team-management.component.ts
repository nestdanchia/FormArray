import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
// https://www.telerik.com/blogs/angular-basics-creating-dynamic-forms-using-formarray-angular
// https://www.itsolutionstuff.com/post/angular-10-reactive-forms-formarray-exampleexample.html
// https://www.concretepage.com/angular/angular-reactive-forms
import { TeamManagementService } from './team-management.service';
import { Team } from './team';
import { Employee } from './employee';
// https://stackoverflow.com/questions/44158198/am-i-using-formarray-correctly
// https://indepth.dev/posts/1245/angular-nested-reactive-forms-using-controlvalueaccessors-cvas
// https://libredd.it/r/angular/comments/oh2fil/adding_nested_components_to_formarray/?sort=controversial
@Component({
	selector: 'app-team',
	templateUrl: './team-management.component.html'
})
//https://www.concretepage.com/angular-2/angular-2-4-formbuilder-example
export class TeamManagementComponent implements OnInit {
	teamForm = {} as FormGroup;
	isValidFormSubmitted: boolean | null = null;
	allSkills: Observable<any[]>;
	constructor(
		private formBuilder: FormBuilder,
		private teamMngService: TeamManagementService) {
		this.allSkills = this.teamMngService.getSkills();
	}
	ngOnInit() {
		this.teamForm = this.formBuilder.group({
			teamName: ['', Validators.required],
			employees: this.formBuilder.array(
				[this.createEmpFormGroup()],
				[Validators.required, Validators.maxLength(5)])
		});
	}
	createEmpFormGroup() {
		return this.formBuilder.group({
			empName: ['', [Validators.required]],
			age: ['', [Validators.required]],
			skill: ['', [Validators.required]],
		})
	}
	get teamName() {
		return this.teamForm.get('teamName');
	}
	get employees(): FormArray {
		return this.teamForm.get('employees') as FormArray;
	}
	addEmployee() {
		let fg = this.createEmpFormGroup();
		this.employees.push(fg);
	}
	deleteEmployee(idx: number) {
		this.employees.removeAt(idx);
	}
	onFormSubmit() {
		console.log('onFormSubmit')
		//this.isValidFormSubmitted = false;
	/*	if (this.teamForm.invalid) {
			return;
		}*/
		this.isValidFormSubmitted = true;
		let team: Team = this.teamForm.value;
		this.teamMngService.saveTeam(team);
		this.teamForm.reset();
	}
	resetTeamForm() {
		this.teamForm.reset();
	}
}








/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}*/
