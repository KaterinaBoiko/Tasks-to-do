import { Injectable } from '@angular/core';
import { Manager } from '../models/manager.model';
import { DesktopService } from './desktop.service';
import { Desktop } from '../models/desktop.model';
import { LoginService } from './login.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  managers: Manager[] = this.getManagers();

  private currDesktopIdsSubject: Subject<number[]> = new Subject();
  public currDesktopIdsEmitter = this.currDesktopIdsSubject.asObservable();

  constructor(private deskService: DesktopService) { }

  getManagers(): Manager[] {
    if (localStorage.getItem('managers') === '[]' || localStorage.getItem('managers') === null)
      this.setDefaultManagers();
    this.managers = JSON.parse(localStorage.getItem('managers'));
    return this.managers;
  }

  findManager(username: string, password: string): Manager {
    return this.managers.find(manager => manager.username == username
      && manager.password == password);
  }

  getNextId(): number {
    let maxUsedId = Math.max(...this.managers.map(x => x.id));
    return ++maxUsedId;
  }

  setDefaultManagers(): void {
    let man1 = new Manager(1, 'admin', '1', null);
    man1.desktopsId.push(0);
    this.addSubordinatesDesktop(man1.id, this.deskService.getNextDesktopId(), 0);
    let defaultManagers = [
      new Manager(0, 'admin', '1111', null),
      man1
    ];
    localStorage.setItem('managers', JSON.stringify(defaultManagers));
  }

  addSubordinatesDesktop(managerId: number, desktopId: number, userId: number): void {
    this.managers.find(x => x.id == managerId).desktopsId.push(desktopId);
    this.deskService.addDesktop(new Desktop(desktopId, 'Default', userId));
    this.currDesktopIdsSubject.next();
    this.saveManagers();
  }

  addSubordinates(userIds: number[], currManagerId: number): void {
    userIds.forEach(x => {
      this.addSubordinatesDesktop(currManagerId, this.deskService.getNextDesktopId(), x);
    });
    localStorage.setItem('authorizedPerson', JSON.stringify(this.managers.find(x => x.id == currManagerId)));
  }
  saveManagers(): void {
    localStorage.setItem('managers', JSON.stringify(this.managers));
  }

  setCurrentPage(page: number): void {
    localStorage.setItem('currentPage', page.toString());
  }
}
