import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';

import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CartRoutingModule } from './cart-routing.module';
import { CartlistComponent } from './cartlist/cartlist.component';


@NgModule({
  declarations: [
    CartlistComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    NzCardModule,
    FormsModule,
    NzButtonModule,
  ]
})
export class CartModule { }
