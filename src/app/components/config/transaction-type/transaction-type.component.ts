import { Component, OnInit } from '@angular/core';
import { TransactionType } from '../models/transaction-type';
import { TransactionTypeService } from '../service/transaction-type.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-type',
  templateUrl: './transaction-type.component.html'
})
export class TransactionTypeComponent implements OnInit {

  transactionType: TransactionType = {
    id: '',
    name: '',
    transactionTypeEnum: '',
    active: true
  };
  submitted = false;
  formStatus = true;
  transactionTypes : TransactionType [] = []; 
  optionTypes : any [] = [];

  constructor(private transactionTypeService: TransactionTypeService) {
  }

  ngOnInit(): void {
    this.submitted=false; 
    this.getAll();
    this.transactionTypeService.findAllTransactionTypes().subscribe(data => {
      this.optionTypes = data;
    });
  }

  save(): void {
    if(this.formStatus){
      const data = {
        name: this.transactionType.name,
        type: this.transactionType.transactionTypeEnum
      };
      this.transactionTypeService.create(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;
          this.getAll();
        },
        error: (e) => console.error(e)
      });
    }else{
      this.update();
    }
    
  }

  update():void{
    this.transactionTypeService.update(this.transactionType)
    .subscribe({
      next:(res) => {
        this.submitted = true;
        this.getAll();
      },
      error: (e) => console.error(e)
    });
  }

  delete(id:any):void{
    this.transactionTypeService.delete(id)
      .subscribe({
        next: (res) => {
          this.getAll();
        },
        error: (e) => console.error(e)
      });
  }

  getAll():void{
    this.transactionTypeService.findAll().subscribe(data => {
      this.transactionTypes = data;
    });
  }

  openEdit(current:TransactionType){
    this.formStatus = false;
    this.submitted = false;
    this.transactionType.id = current.id;
    this.transactionType.name = current.name;
    this.transactionType.transactionTypeEnum = current.transactionTypeEnum;
    this.transactionType.active = current.active;
  }

  newTransactionType(): void {
    this.submitted = false;
    this.formStatus = true;
    this.transactionType = {
      id: '',
      name: '',
      transactionTypeEnum: '',
      active: true
    };
  }

  
}
