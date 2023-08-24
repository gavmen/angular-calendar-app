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
    this.currentMonth = now.getMonth() + 1;
    this.currentYear = now.getFullYear();
  }

  prevMonth() {
    if (this.currentMonth === 1) {
      this.currentMonth = 12;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.updateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 12) {
      this.currentMonth = 1;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.updateCalendar();
  }

  updateCalendar() {
    if (this.calendarGridComponent) {
      this.calendarGridComponent.initializeDaysInMonth(this.currentMonth, this.currentYear);
    }
  }
  
}
