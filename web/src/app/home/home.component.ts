import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonService } from '../common.service';
import { MatTabChangeEvent } from '@angular/material/tabs/typings/tab-group';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalAmount:any = 0;
  heading:string = "all";
  categories = ["computer","fruits","vegetables"];
  amount = {};
  searchText:string;
  items = [
   
  ];
  count = {};
  basket = [];
  products = [];
  constructor(public commonService:CommonService,public authService: AuthService,router: Router) { 
     this.getAllProducts();
  }

  ngOnInit() {
  }
  
  drop(event: CdkDragDrop<string[]>) {
     transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
  }

  increment(key,perPrice){
    if(this.count[key]){
      this.count[key]++;
    }else{
      this.count[key] = 1;
    }
    this.amount[key] = (perPrice*this.count[key]);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    this.totalAmount = Object.values(this.amount).reduce(reducer);
  }

  decrement(key,perPrice){
    if( this.count[key] > 0){
      this.count[key]--;
    }
    this.amount[key] = (perPrice*this.count[key]);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    this.totalAmount = Object.values(this.amount).reduce(reducer);
  }
  
  updatePrice(key,perPrice){
    if(!isNaN(this.count[key])){
      this.amount[key] = (perPrice* this.count[key]);
      console.log(typeof this.amount[key]);
    }else{
      this.amount[key] = (perPrice* 0);
      this.count[key] = null;
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    this.totalAmount = Object.values(this.amount).reduce(reducer);
  }

  remove(i,key,perPrice){
     Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.count[key] = null;
        this.amount[key] = (perPrice*this.count[key]);
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        this.totalAmount = Object.values(this.amount).reduce(reducer);
        this.basket.push(this.items[i]);
        this.items.splice(i,1);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  setHead(item:MatTabChangeEvent){
    this.heading = item.tab.textLabel;
    this.searchByTabSelection(); 
  }

  getAllProducts(){
    this.commonService._get('manager/get-product',(res)=>{
      console.log(res);
      this.basket = res.response;
      this.products = res.response;
    },(err)=>{

    });
  }

  searchByName(){
    if(this.searchText){
      console.log(this.searchText);
      let filter = this.products.filter((e)=>{
        return e.name.search(this.searchText) !== -1; 
      });
      this.basket = filter;
    }else{
      if(this.heading === "all"){
        this.getAllProducts();
     }else{
       let filter = this.products.filter((e)=>{
         return e.category == this.heading;
        });
        console.log(filter);
        this.basket = filter;
     }
    }
    
     
  }

  searchByTabSelection(){
      if(this.heading === "all"){
        this.getAllProducts();
      }else{
       let filter = this.products.filter((e)=>{
         return e.category == this.heading;
        });
        console.log(filter);
        this.basket = filter;
      }
    }
}
