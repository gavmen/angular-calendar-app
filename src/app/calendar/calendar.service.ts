import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Appointment {
  id: number;
  title: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private appointments: Appointment[] = [];
  private appointments$ = new BehaviorSubject<Appointment[]>(this.appointments);

  get appointmentsObservable() {
    return this.appointments$.asObservable();
  }

  addAppointment(appointment: Appointment) {
    this.appointments.push(appointment);
    this.appointments$.next(this.appointments);
  }

  deleteAppointment(id: number) {
    this.appointments = this.appointments.filter(app => app.id !== id);
    this.appointments$.next(this.appointments);
  }

  updateAppointments(updatedAppointments: Appointment[]) {
    this.appointments = updatedAppointments;
    this.appointments$.next(this.appointments);
  }
}
