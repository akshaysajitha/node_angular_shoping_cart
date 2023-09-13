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
  onButtonClick(){
    this.router.navigate(['/cart']);
  }
  

  addtocart(item:any):void{
    const { pid, name, rate, shortdiscretion, imageurl, discretion, quantity } = item;
    

     this.myservice.addToCart(pid, name, rate, shortdiscretion, imageurl, discretion, quantity, this.sessionId).subscribe(
      (response)=>{
        if(response.token){
          this.sessionId=response.token;
          localStorage.setItem('sessionId',this.sessionId)
        }
        
        console.log('Item added to cart:', response);
      }, 
      (error) => {
        console.error('Error adding item to cart:', error);
      },

     )
    
   this.onButtonClick()

  }

  logout(){
    this.sessionId='null'
    localStorage.clear()
    
  }

}
