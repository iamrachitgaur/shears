import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  appointmentForm: FormGroup;
  
  salonServices = [
    { name: 'Haircut', price: 20 },
    { name: 'Beard Trim', price: 15 },
    { name: 'Shampoo', price: 10 },
    { name: 'Shaving', price: 18 },
    { name: 'Manicure', price: 15 },
    { name: 'Pedicure', price: 20 }
  ];
  
  constructor(private fb: FormBuilder) {}

  bookAppointment() {
    // Implement your appointment booking logic here
    const selectedService = this.appointmentForm.value.selectedService;
    const selectedSlot = this.appointmentForm.value.selectedSlot;

    console.log(`Service: ${selectedService}, Slot: ${selectedSlot}`);
    // Add further logic for appointment booking
  }


  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      selectedService: ['', Validators.required],
      selectedSlot: ['', Validators.required],
    });


  }

}
