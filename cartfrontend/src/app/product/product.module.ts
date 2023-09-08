import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ProductRoutingModule } from './product-routing.module';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NzCardModule ,
    FormsModule,
    NzButtonModule
  ]
})
export class ProductModule { }
