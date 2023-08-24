import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarGridComponent } from './calendar-grid/calendar-grid.component';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();

  @ViewChild(CalendarGridComponent, { static: false }) calendarGridComponent?: CalendarGridComponent;

  constructor() {}

  ngOnInit() {
    const now = new Date();
    this.currentMonth = now.getMonth();
    this.currentYear = now.getFullYear();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
    } else {
        this.currentMonth++;
    }
    if (this.calendarGridComponent) {
        this.calendarGridComponent.initializeDaysInMonth(this.currentMonth, this.currentYear);
    }
}
  
prevMonth() {
    if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
    } else {
        this.currentMonth--;
    }
    if (this.calendarGridComponent) {
        this.calendarGridComponent.initializeDaysInMonth(this.currentMonth, this.currentYear);
    }
  }

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  updateCalendar() {
    if (this.calendarGridComponent) {
      this.calendarGridComponent.initializeDaysInMonth(this.currentMonth, this.currentYear);
    }
  }
  
}
