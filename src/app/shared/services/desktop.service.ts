import { Injectable } from '@angular/core';
import { Desktop } from '../models/desktop.model';
import { Task } from '../models/task.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesktopService {

  desktops: Desktop[] = this.getDesktops();
  currentDesktop: Desktop;

  private currDesktopSubject: Subject<Desktop> = new Subject();
  public currDesktopEmitter = this.currDesktopSubject.asObservable();

  setCurrentDesktop(deskId: number): void {
    this.currentDesktop = this.desktops.find(x => x.id == deskId);
    this.currDesktopSubject.next(this.currentDesktop);
    localStorage.setItem('currentDesktopId', deskId.toString());
  }

  constructor() { }

  addDesktop(desk: Desktop): void {
    this.desktops.push(desk);
    this.saveDesktops();
  }

  getDesktops(): Desktop[] {
    if (localStorage.getItem('desktops') === '[]' || localStorage.getItem('desktops') === null)
      this.setDefaultDesktops();
    this.desktops = JSON.parse(localStorage.getItem('desktops'));
    return this.desktops;
  }

  saveDesktops(): void {
    localStorage.setItem('desktops', JSON.stringify(this.desktops));
  }

  getNextDesktopId(): number {
    let maxUsedId = Math.max(...this.desktops.map(x => x.id));
    return ++maxUsedId;
  }

  getNextTaskIdByDesktopId(): number {
    let len = 0;
    this.desktops.forEach(x => {
      len += x.tasks.length;
    });
    return len;
  }

  getDesktopsByUserId(id: number): Desktop[] {
    let desktops = this.desktops.filter(x => x.userId == id);
    if (desktops.length == 0)
      this.addDesktop(new Desktop(this.getNextDesktopId(), "New desktop", id));
    return this.desktops.filter(x => x.userId == id);
  }

  setDefaultDesktops(): void {
    let defaultDesktops = [];
    let desk1 = new Desktop(0, 'Amazing project', 0);
    let desk2 = new Desktop(1, 'Work', 0);
    let task1 = new Task(5, 'a lot of data here');
    task1.description = "bla bla bla, there is a lot descrription here";
    task1.checklist = [[true, "do it first"], [false, "do it then"], [false, "somth else"]];
    task1.readiness = 25;
    task1.deadline = new Date(2020, 1, 1);
    task1.status = 1;
    desk1.addTask(new Task(0, 'think about structure of project'));
    desk1.addTask(new Task(1, 'start doing project'));
    desk1.addTask(new Task(2, 'make header'));
    desk1.addTask(new Task(3, 'yyyyy'));
    desk1.addTask(task1);
    desk2.addTask(new Task(4, 'wake up!'));
    defaultDesktops.push(desk1, desk2);

    localStorage.setItem('desktops', JSON.stringify(defaultDesktops));
  }
}
