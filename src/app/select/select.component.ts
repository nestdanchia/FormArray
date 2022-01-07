import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
interface Food {
  value: string;
  viewValue: string;
}
// https://melvingeorge.me/blog/remove-duplicate-elements-from-array-of-objects-javascript

export interface PeriodicElement {

  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface SelectedFood {

  name: string;
  foodSelect: string
}
const duplicados = [
  {
    name: "Monica",
    foodSelect: 'Steack'
  },
  {
    name: "Carlos",
    foodSelect: 'Steack'
  },
  {
    name: "Alex",
    foodSelect: 'Pizza'
  },
  {
    name: "Carlos",
    foodSelect: 'Pizza'
  },
  {
    name: "Alex",
    foodSelect: 'Tacos'
  },
  {
    name: "Monica",
    foodSelect: 'Tacos'
  },

]

// https://stackoverflow.com/questions/41653180/how-to-get-the-active-tab-in-angular-material2
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
// npm/yarn run 
//https://stackoverflow.com/questions/65796767/how-can-i-display-a-select-list-within-an-angular-material-table
// display a select list within an Angular Material table
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements AfterViewInit, OnInit {
  public myForm!: FormGroup;
  selectFood: SelectedFood[] = []
  selectFoodName: SelectedFood[] = []
  // https://www.freakyjolly.com/angular-material-109-mat-select-tutorial-with-local-and-dynamic-http-response/
  /*no logro que funcione
  @ViewChild('select')
  select!: MatSelect;*/
  // <mat-select [(ngModel)]="selectedValue" name="food">
  //foodControl=new FormControl({value: '', disabled: false},Validators.required)
  selectedValue!: string;
  // #mySelect  [(value)]="selectedValue"--> CAMBIA A TODOS 
  //  <mat-select [(value)]="selected">
  //   <select matNativeControl [(ngModel)]="selected">
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'validFoo'];
  dataSource = ELEMENT_DATA;
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  selectedFood = this.foods[2].value;
  estado!: string;

  estados = [
    {
      id: 'paid',
    },
    {
      id: 'toPay',

    },

  ];
  // https://embed.plnkr.co/plunk/pGUluU
  constructor(private fb: FormBuilder) {

  }
  // { onlySelf: true } mo burbujea
  ngOnInit() {
    const localseleccion = localStorage.getItem('selectNames') || 'default-token';
    console.log('localseleccion!!!!!!!!!!!!!!!!', localseleccion)
    const arryObject = JSON.parse(localseleccion);
    console.log('arrObject!!!!!', arryObject);
    //const u=this.selectFoodName.map(obj=>obj.foodSelect)
    // console.log('this.selectFoodName ngOnInit()',this.selectFoodName)
    //  console.log('uuuuuu!!!!!',u)
    this.myForm = this.fb.group({
      foodControl: [''],

    });
    // https://www.code-helper.com/answers/select-option-in-reactive-forms
    //this.selectFoodName
    console.log('this.myForm.get(foodControl)!!!!!!!!', this.myForm.get('foodControl'))
    this.myForm.get('foodControl')?.setValue('Pizza')
    const uno = this.myForm.get('foodControl')?.value.value;
    console.log('uno!!!!!', uno)

    this.selectedValue = localStorage.getItem('estado') || 'default-token';
    //no funciona valueChanges
    //this.foodControl.get('food')?.valueChanges.subscribe(value=>console.log('foodControl',value));
    // this.foodControl.get('food')?.setValue(this.selectedFood,{ emitEvent: false } )

  }
  save(model: any,) {

    console.log(model);
  }
  // https://stackblitz.com/edit/angular-1e9gsd-34hrwg?file=app%2Fselect-overview-example.ts
  ngAfterViewInit() {
    // this.select.optionSelectionChanges.subscribe(res => {console.log('select',res)});

  }

  onChange(event: Event) {


    this.estado = (event.target as HTMLInputElement).value;
    localStorage.setItem('estado', this.estado);
    this.selectedValue = localStorage.getItem('estado') || 'default-token';
    console.log('this.selectedValue', this.selectedValue, localStorage.getItem('estado'))

  }
  // https://stackblitz.com/edit/angular-gl65wf?file=app%2Fselect-multiple-example.ts
  change(event: any) {
    if (event.isUserInputs) {
      this.estado = event.source.value;
      localStorage.setItem('estado', this.estado);
      this.selectedValue = localStorage.getItem('estado') || 'default-token';
      console.log('this.selectedValue', this.selectedValue, localStorage.getItem('estado'))
      console.log(event.source.value, event.source.selected);
    }
  }
  removeItemStorage(key: string) {
    localStorage.removeItem(key);
  }
  descargarPDF(event: any) {

  }
  descargarDocx(event: any): void { }
  onRowClicked(row: any): void {
    console.log('row', row)
  }
  // stateChanges: Subject<void>.....trigger: ElementRef...triggerValue: string
  //MatSelectChange source: MatSelect  value:  close
  select1(foo: any) {
    console.log("foo")
  }
  //desde tabl envia objeto Object { value: "steak-0", viewValue: "Steak" }

  doSomething(event: any, row: any): void {
    console.log('Food changed...', row.name);
    /*
var Data = [ {id_list:1, name:'Nick',token:'312312'}, {id_list:2,name:'John',token:'123123'} ] You can do: var index = Data.map(function(e) { return e.name; }).indexOf('Nick')
    */
    //let selectedFood = event.value.viewValue;
    //console.log(selectedFood);
    this.estado = event.source.value;
    let name = row.name;
    let foodSelect = this.estado;
    // lastIndexOf() https://www.javascripttutorial.net/javascript-array-indexof/
    // https://www.javascripttutorial.net/javascript-array-filter/
    let selecciono = { name: name, foodSelect: foodSelect }
    console.log('selecciono!!!!!!', selecciono)
    let model = [{ name: '', foodSelect: '' }]
    this.selectFood = [...this.selectFood, selecciono];
    console.log('this.selectFood!!!!!!!!', this.selectFood)
    const namesFooSelect = this.selectFood.map(o => { let a = o.name; let b = o.foodSelect; return ({ a, b }) });
    console.log('namesFooSelect!!!!!!!!!!!!!!!!!', namesFooSelect)
    const names = this.selectFood.map(o => o.name);
    console.log('names!!!!!!!!!!!!!!!!!!!!!', names);
    // https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
    // filter crea un nuevo array con todos los elementos que cumplen una condicion
    this.selectFoodName = this.selectFood.filter(({ name }, index) => !names.includes(name, index + 1))
    console.log('this.selectFoodName', this.selectFoodName)

    /*
    name: "Hydrogen", foodSelect: "Steak"
    console.log('this.selectFood.lastIndexOf', this.selectFood.lastIndexOf({
       name:row.name,
       foodSelect:this.estado
     })
    )
    const arr = [{id: 1, name: 'one'}, {id: 2, name: 'two'}, {id: 1, name: 'one'}]
    
    const ids = arr.map(o => o.id)
    const filtered = arr.filter(({id}, index) => !ids.includes(id, index + 1))
    
    console.log(filtered)
    */
    // https://www.tutsmake.com/javascript-remove-duplicate-objects-from-array/
    /*
    const lastName = Array.from(new Set(this.selectFood.map(a => a.name)))
    .map(name => {
      return this.selectFood.find(a => a.name === name)
    })
    const arrTwo=this.selectFood.filter((item,index)=>this.selectFood.lastIndexOf(item)==index);
    console.log(' arrTwo', arrTwo)
    
    console.log(' lastName', lastName)
    
   console.log('this.selectFood',this.selectFood)
         console.log('estado',this.estado);*/
    //localStorage.setItem('estado', this.estado);
    localStorage.setItem("selectNames", JSON.stringify(this.selectFoodName));
    this.selectedValue = localStorage.getItem('selectNames') || 'default-token';
    console.log('this.selectedValue', this.selectedValue);
    console.log("localStorage.getItem('estado')", localStorage.getItem('estado'))
    console.log('event.source.value', event.source.value);
    console.log('event.source.selected', event.source.selected);
    //this.selectedFood0(this.selectFoodName)

  }
  /*
  selectedFood0(foods:any){
    return foods
  }
  */
  doIndividual(event: any): void {
    console.log('Food changed  doIndividua...');
    let selectedFood = event.value;
    console.log(selectedFood);
  }
}
/*
event-->Object { source: {…}, value: "pizza-1" }
<mat-form-field >
            <mat-select [formControl]="foodControl">
              <mat-option></mat-option>
              <mat-option [value]="option.value" 
              *ngFor="let option of foods">
              {{ option.viewValue }}
              </mat-option>
            </mat-select>


*/

