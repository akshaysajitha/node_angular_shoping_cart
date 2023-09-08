import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopserviceService } from 'src/app/shopservice.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  productdata!:any[]

  constructor(private myservice: ShopserviceService, private router: Router) { }

  ngOnInit(): void {
    this.myservice.getData().subscribe(
      (response) => {
        this.productdata = response;
        console.log('check', this.productdata);
      }
    );
  }


  addtocart(item:string):void{
     const productdatasend={
      pid:item
     };

     this.myservice.addToCart(productdatasend).subscribe(
      (response)=>{
        console.log('Item added to cart:', response);
      },
      (error) => {
        console.error('Error adding item to cart:', error);
      },

     )
    
    //  next page cart navigate button wrk function

  }

}
