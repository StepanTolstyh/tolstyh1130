import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttp } from '../components/services/basehttp';

@Injectable({
  providedIn: 'root'
})
export class MproductService extends BaseHttp {

  constructor(public http: HttpClient) {
    super(http, 'mproducts'); 
   }
}
