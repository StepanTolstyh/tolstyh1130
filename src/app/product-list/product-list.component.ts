import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mproducts } from '../shared/components/header/models/mproducts.model';
import { MproductService } from '../shared/services/mproduct.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Mproducts[] | undefined;
  
  constructor(private mproductService: MproductService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  async getData(){
    try{
    let products = this.mproductService.getAll();
    this.products = (await products === null || await products === undefined) ? []: await products;
    }catch(err){
     console.error(err);
    }
  }

  onAddProduct(){
    this.router.navigate([this.router.url, 'edit'])
  }
  
  OnLinkProfile(id: number){
this.router.navigate([this.router.url,'edit', id])
}
}
