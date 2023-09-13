import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartlistComponent } from './cartlist/cartlist.component';
const routes: Routes = [
  {path:'',component:CartlistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
