import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  timeSlots:any = []

  constructor(private profileService:ProfileService) { }

  ngOnInit(): void {
    this.profileService.getTimeSlot().subscribe(
      (timeSlot)=>{
        this.timeSlots = timeSlot
      }
    )
  }

}
