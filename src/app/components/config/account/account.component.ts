import { Component, OnInit } from '@angular/core';
import { AccountService } from '../service/account.service';
import { Account } from '../models/account';
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit{

  faPlus = faPlus;
  faPen = faPen;
  faTrash = faTrash;

  submitted = false; 
  formStatus = true;
  accounts : Account [] = []; 

  account: Account = {
    id: '',
    name: '',
    description: '',
    balance:0,
    active:true
  };

  constructor(private accountService:AccountService){
  }

  ngOnInit(): void {
    this.submitted=false; 
    this.getAll();
  }

  save(): void {
    if(this.formStatus){
      const data = {
        name: this.account.name,
        description: this.account.description,
        balance: this.account.balance,
        active: this.account.active
      };
      this.accountService.create(data)
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
    this.accountService.update(this.account)
    .subscribe({
      next:(res) => {
        this.submitted = true;
        this.getAll();
      },
      error: (e) => console.error(e)
    });
  }

  delete(id:any):void{
    this.accountService.delete(id)
      .subscribe({
        next: (res) => {
          this.getAll();
        },
        error: (e) => console.error(e)
      });
  }

  getAll():void{
    this.accountService.findAll().subscribe(data => {
      this.accounts = data;
    });
  }

  openEdit(current:Account){
    this.formStatus = false;
    this.submitted = false;
    this.account.id = current.id;
    this.account.name = current.name;
    this.account.description = current.description;
    this.account.balance = current.balance;
    this.account.active = current.active;
  }

  newAccount(): void {
    this.submitted = false;
    this.formStatus = true;
    this.account = {
      id: '',
      name: '',
      description: '',
      balance:0,
      active:true
    };
  }

}
