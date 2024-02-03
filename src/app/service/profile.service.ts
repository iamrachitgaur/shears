import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  getTimeSlot(){
    return this.http.get('https://iamrachitgaur.github.io/AngularJSON/shears/dateSlot.json')
  }
}
