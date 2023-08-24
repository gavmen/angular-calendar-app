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

  drop(event: CdkDragDrop<Date[]>) {
    const prevIndex = this.appointments.findIndex(
      app => app.id === event.item.data.id
    );
    const targetDate = this.daysInMonth[event.currentIndex].date;
    this.appointments[prevIndex].date = new Date(targetDate);
    this.calendarService.updateAppointments(this.appointments);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
