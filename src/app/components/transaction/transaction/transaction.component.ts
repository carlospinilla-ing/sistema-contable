import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../service/transaction.service';
import { AccountService } from '../../config/service/account.service';
import { TransactionTypeService } from '../../config/service/transaction-type.service';
import { Account } from '../../config/models/account';
import { TransactionType } from '../../config/models/transaction-type';
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  providers:[AccountService,TransactionTypeService]
})
export class TransactionComponent implements OnInit{
  submitted = false; 
  formStatus = true;
  transactions : Transaction [] = [];
  accounts: Account[] = [];
  accountsOn: Account[] = [];
  transactionTypes: TransactionType[] = [];
  transactionTypesOn: TransactionType[] = [];

  faPlus = faPlus;
  faPen = faPen;
  faTrash = faTrash;

  transaction: Transaction = {
    id: 0,
    name: '',
    description: '',
    idTransactionType:'',
    idAccount:'',
    transactionValue:0,
    transactionDate:''
  };

  constructor(
    private transactionService:TransactionService,
    private accountService:AccountService,
    private transactionTypeService:TransactionTypeService
    ){
  }

  ngOnInit(): void {
    this.submitted=false; 
    this.loadParameters();
    this.getAll();
  }

  save(): void {
    if(this.formStatus){
      const data = {
        name: this.transaction.name,
        description: this.transaction.description,
        transactionType: this.transaction.idTransactionType,
        account: this.transaction.idAccount,
        transactionValue: this.transaction.transactionValue,
        transactionDate: this.transaction.transactionDate
      };
      this.transactionService.create(data)
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
    this.transaction.account = this.transaction.idAccount;
    this.transaction.transactionType = this.transaction.idTransactionType;
    this.transactionService.update(this.transaction)
    .subscribe({
      next:(res) => {
        this.submitted = true;
        this.getAll();
      },
      error: (e) => console.error(e)
    });
  }

  delete(id:any):void{
    this.transactionService.delete(id)
      .subscribe({
        next: (res) => {
          this.getAll();
        },
        error: (e) => console.error(e)
      });
  }

  getAll():void{
    this.transactionService.findAll().subscribe(data => {
      this.transactions = data.map(element=>{        
        element.transactionDate = element.transactionDate?.substring(0,10);
        return element;
      });
      this.refreshAccounts();
    });
  }

  refreshAccounts():void{
    this.accounts = this.accounts.map(i => {
      i.balance = i.balance;
      i.transaction = 0;
      return i;
    })
    this.transactions.map(element =>{
      if(element.transactionType.transactionTypeEnum == 'INCOME'){
        this.accounts = this.accounts.map(i=>{
          if(i.id == element.account.id){
            if(i.transaction != undefined && element.transactionValue != undefined ){
              i.transaction = i.transaction.valueOf() + element.transactionValue.valueOf();
            }
          }
          return i;
        });
      }else{
        this.accounts = this.accounts.map(i=>{
          if(i.id == element.account.id){
            if(i.transaction != undefined && element.transactionValue != undefined ){
              i.transaction = i.transaction.valueOf() - element.transactionValue.valueOf();
            }
          }
          return i;
        });
      }
    });
    this.accounts = this.accounts.map(i => {
      if(i.balance != undefined && i.transaction != undefined){
        i.transaction = i.balance.valueOf() + i.transaction.valueOf();
      }
      return i;
    })
  }

  loadParameters():void{
    this.accountService.findAll().subscribe({
      next:(resp) =>{
        this.accounts = resp.map(i=>{
          i.transaction = 0;
          return i;
        });
      },
      error: (e) => console.error(e)
    });
  }

  openEdit(current:Transaction){
    this.formStatus = false;
    this.submitted = false;
    this.transaction.id = current.id;
    this.transaction.name = current.name;
    this.transaction.description = current.description;
    this.transaction.idTransactionType = current.transactionType?.id;
    this.transaction.idAccount = current.account?.id;
    this.transaction.transactionValue = current.transactionValue;
    this.transaction.transactionDate = current.transactionDate;
    this.loadOnParameters(current.account,current.transactionType);
  }

  newTransaction(): void {
    this.submitted = false;
    this.formStatus = true;
    this.transaction = {
      id: 0,
      name: '',
      description: '',
      idTransactionType:'',
      idAccount:'',
      transactionValue:0,
      transactionDate:''
    };
    this.loadOnParameters({},{});
  }

  loadOnParameters(account:Account,transactionType:TransactionType):void{
    this.transactionTypeService.findAllByActive().subscribe({
      next:(resp) =>{
        this.transactionTypesOn = resp;
        if(!this.formStatus && !transactionType.active){
          this.transactionTypesOn.push(transactionType);
        }
      },
      error: (e) => console.error(e)
    });

    this.accountService.findAllByActive().subscribe({
      next:(resp) =>{
        this.accountsOn = resp;
        if(!this.formStatus && !account.active){
          this.accountsOn.push(account)
        }
      },
      error: (e) => console.error(e)
    });
  }
}
