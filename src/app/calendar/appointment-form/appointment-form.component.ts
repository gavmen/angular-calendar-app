import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarService, Appointment } from '../calendar.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private calendarService: CalendarService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const appointment: Appointment = {
        id: Date.now(),
        title: this.form.value.title,
        date: new Date(this.form.value.date.setHours(0, 0, 0, 0)) // Reset the time to midnight
      };
      this.calendarService.addAppointment(appointment);
      this.form.reset();
    }
  }
}
