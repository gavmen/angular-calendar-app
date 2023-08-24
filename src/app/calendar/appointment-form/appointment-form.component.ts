import { Component, Input } from '@angular/core'; // Import Input
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarService, Appointment } from '../calendar.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent {
  form: FormGroup;

  // @Input() currentMonth!: number;
  // @Input() currentYear!: number;
  

  constructor(private fb: FormBuilder, private calendarService: CalendarService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required]
    });
  }
  

  onSubmit() {
    const formValue = this.form.value;
    const selectedDate = formValue.date;
    const newAppointment: Appointment = {
      id: Date.now(),
      title: formValue.title,
      date: selectedDate
    };
    this.calendarService.addAppointment(newAppointment);
    this.form.reset();
}
}
