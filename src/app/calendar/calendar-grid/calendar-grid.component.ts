import { Component, OnInit } from '@angular/core';
import { CalendarService, Appointment } from '../calendar.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-calendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss']
})
export class CalendarGridComponent implements OnInit {
  daysInMonth: { date: Date, appointments: Appointment[] }[] = [];
  appointments: Appointment[] = [];

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
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
    const currentDate = this.daysInMonth[event.currentIndex].date;
    this.appointments[prevIndex].date = currentDate;
    this.calendarService.updateAppointments(this.appointments);
 }
}
