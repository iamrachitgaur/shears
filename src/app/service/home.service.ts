import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  nearbyBarbershop(){
    return this.http.get('https://iamrachitgaur.github.io/AngularJSON/shears/nearbyBarbershop.json')
  }

}
