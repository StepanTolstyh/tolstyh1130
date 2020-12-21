import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MproductService } from '../shared/services/mproduct.service';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  
  productForm!: FormGroup;
  id!: number ;
  product: any;

  constructor(private activatedRoute: ActivatedRoute, 
    private mproductService: MproductService,
    private router: Router){
    this.activatedRoute.params.subscribe((param) =>{
this.id = param.id;
    })
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      weidth: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      
    })
    this.getData();
  }


async getData(){
  if (!(this.id === null || this.id === undefined)){
    try{
      let product = this.mproductService.getOneById(this.id);
      this.product = await product;
    }catch(err){
      console.error(err);
    }
    this.productForm.patchValue({
name: this.product.name,
price: this.product.price,
weidth: this.product.weidth,
amount: this.product.amount,
category: this.product.category,
    });
  }
}
async onDelete(){
  try{await this.mproductService.deleteOneById(this.id);

  } catch(err){
    console.error(err);
  }
  this.router.navigate(['/products']);
}

async onSave(){
  if (!(this.id === null || this.id === undefined)){
    try{
      await this.mproductService.putOneById(this.id, this.productForm.value);
    } catch(err){
      console.error(err);
    }
  } else {
    try {
      let res = await this.mproductService.postOne(this.productForm.value);
      this.router.navigate([this.router.url, res.id]);
      this.getData();
    } catch(err) {
      console.error(err);
    }
  }
}
}
