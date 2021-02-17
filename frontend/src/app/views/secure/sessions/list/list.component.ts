import { Component, OnInit } from '@angular/core';
import SessionModel from '../sessions.model';
import { SessionsService } from '../sessions.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  public currentList: SessionModel[];
  public expiredList: SessionModel[];
  public futureList: SessionModel[];

  constructor(private readonly sessionsService: SessionsService) { }

  async ngOnInit() {
    const [current, expired, future] = await Promise.all([
      this.sessionsService.getCurrentSessions().toPromise(),
      this.sessionsService.getExpiredessions().toPromise(),
      this.sessionsService.getFutureSessions().toPromise(),
    ]);

    this.currentList = current.data;
    this.expiredList = expired.data;
    this.futureList = future.data;
  }
}
