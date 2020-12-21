import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path:'',
        component: ProductListComponent,
      },
    {
      path:'edit',
    component: ProductEditComponent,
    },
    {
      path:'edit/:id',
    component: ProductEditComponent,
    }
    ]
  },

  {
    path: 'products',
    loadChildren:() => 
    import('./products/products.module').then((m) => m.ProductsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
