import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  salonServices = [
    { name: 'Haircut',icon:'cut' },
    { name: 'Shampoo',icon:'water_bottle' },
    { name: 'Shaving',icon:'face' },
    { name: 'haircolor',icon:'face_4'}
  ];

  nearbyShops:any = []

  constructor(private homeService:HomeService) { }
  ngOnInit(): void {
    this.homeService.nearbyBarbershop().subscribe((shop)=>{
      this.nearbyShops = shop
    })
  }

}
