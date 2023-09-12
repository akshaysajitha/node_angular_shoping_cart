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
  sessionId: any='null';

  constructor(private myservice: ShopserviceService, private router: Router) { }

  ngOnInit(): void {
    const storedSessionId = localStorage.getItem('sessionId');
    this.sessionId = storedSessionId !== null ? storedSessionId : null;
    this.myservice.getData().subscribe(
      (response) => {
        this.productdata = response;
        console.log('check', this.productdata);
      }
    );
  }


  addtocart(item:any):void{
    const { pid, name, rate, shortdiscretion, imageurl, discretion, quantity } = item;
    

     this.myservice.addToCart(pid, name, rate, shortdiscretion, imageurl, discretion, quantity, this.sessionId).subscribe(
      (response)=>{
        if(response.token){
          this.sessionId=response.token;
          localStorage.setItem('sessionId',this.sessionId)
        }
        alert(pid+name+rate+shortdiscretion+imageurl+discretion+'quentity'+quantity+'session'+this.sessionId )
        console.log('Item added to cart:', response);
      },
      (error) => {
        console.error('Error adding item to cart:', error);
      },

     )
    
    //  next page cart navigate button wrk function

  }

  logout(){
    this.sessionId='null'
    localStorage.clear()
    
  }

}
