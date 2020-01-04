import { Injectable } from '@angular/core';
import { Desktop } from '../models/desktop.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class DesktopService {

  desktops: Desktop[] = this.getDesktops();

  constructor() { }

  setDefaultDesktops(): void {
    let defaultDesktops = [];
    let desk1 = new Desktop(0, 'Amazing project', 0);
    let desk2 = new Desktop(1, 'Work', 0);
    desk1.addTask(new Task(0, 'think about structure of project'));
    desk1.addTask(new Task(1, 'start doing project'));
    desk2.addTask(new Task(2, 'wake up!'));
    defaultDesktops.push(desk1, desk2)

    localStorage.setItem('desktops', JSON.stringify(defaultDesktops));
  }

  getDesktops(): Desktop[] {
    if (localStorage.getItem('desktops') === '[]' || localStorage.getItem('desktops') === null) 
      this.setDefaultDesktops();
    this.desktops = JSON.parse(localStorage.getItem('desktops'));
    return this.desktops;
  }

  getNextId(): number {
    return this.desktops.length;
  }
}
