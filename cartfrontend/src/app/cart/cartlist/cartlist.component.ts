import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopserviceService } from 'src/app/shopservice.service';
@Component({
  selector: 'app-cartlist',
  templateUrl: './cartlist.component.html',
  styleUrls: ['./cartlist.component.css']
})
export class CartlistComponent implements OnInit {
  productdata!:any[];

  constructor(private myservice: ShopserviceService, private router: Router) { }

  ngOnInit(): void {
    const sessionId = localStorage.getItem('sessionId');
    console.log(sessionId)
    this.myservice.cartview(sessionId).subscribe(
      (response) => {
        this.productdata = response;
        console.log('check', this.productdata);
      }
    );
  }
  addressform(){
    
    
  }


 

}
