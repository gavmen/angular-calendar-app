import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalendarService, Appointment } from '../calendar.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-calendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss']
})
export class CalendarGridComponent implements OnInit, OnDestroy {
  daysInMonth: { date: Date, appointments: Appointment[] }[] = [];
  appointments: Appointment[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.initializeDaysInMonth();
    this.subscription = this.calendarService.appointmentsObservable.subscribe(appointments => {
      this.appointments = appointments;
      this.initializeDaysInMonth();
    });
  }

  initializeDaysInMonth(month: number = new Date().getMonth(), year: number = new Date().getFullYear()) {
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    
    this.daysInMonth = [];
    for (let day = startOfMonth; day <= endOfMonth; day.setDate(day.getDate() + 1)) {
      this.daysInMonth.push({
        date: new Date(day),
        appointments: this.getAppointmentsForDate(new Date(day))
      });
    }
  }

  getAppointmentsForDate(date: Date): Appointment[] {
    return this.appointments.filter(app => app.date.toDateString() === date.toDateString());
  }

  deleteAppointment(id: number) {
    this.calendarService.deleteAppointment(id);
  }

  trackByDate(index: number, day: { date: Date, appointments: Appointment[] }): string {
    return day.date.toISOString();
  }

  drop(event: CdkDragDrop<Date[]>) {
    console.log('Drag and Drop Event:', event); // Debugging statement 1
  
    const prevIndex = this.appointments.findIndex(
      app => app.id === event.item.data.id
    );
  
    // Get the target date based on the drop index
    const targetDate = this.daysInMonth[event.currentIndex].date;
    console.log('Target Date:', targetDate); // Debugging statement 2
  
    // Update the date of the appointment
    this.appointments[prevIndex].date = targetDate;
  
    // Update the appointments in the service
    this.calendarService.updateAppointments(this.appointments);
  
    console.log('Updated Appointments:', this.appointments); // Debugging statement 3
  }
  
  
  

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
