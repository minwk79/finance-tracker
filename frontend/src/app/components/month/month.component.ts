import { Component, OnInit } from '@angular/core';

import { TrackersService } from 'src/app/services/trackers.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  currentMonth!: string;
  currentSpendings: any[] = [];

  trackers!: any[];

  // availableMonths: any[];

  constructor(
    private trackersService: TrackersService
  ) { }

  ngOnInit(): void {
    // display current month 
    this.currentMonth = new Date().toISOString().split('T')[0].substring(0, 7);
    console.log('date:', this.currentMonth);

    const userId = JSON.parse(window.localStorage.getItem('user') || '')?._id;
    this.trackersService.getTrackersByUser(userId).subscribe((trackers: any) => {
      this.trackers = trackers;
      const currentTracker = trackers.find((tracker: any) => tracker.month === this.currentMonth);
      if (currentTracker) {
        for (let spending of currentTracker.spendings) {
          console.log('spending', spending);
          this.currentSpendings.push(spending);
        }
      }
    })

    // TODO: custom pipe, 'yyyy-mm' => '<Month> <Year>' text format.
  }

  // TODO: Create Prev, Next function. use arr.indexOf() to check if either date is valid (inside of trackers array,
  // not out of bounds, etc). If so, change the current month and spendings. 

  // TODO: Create boolean variables (hasPrevMonth, hasNextMonth) and use for button [disabled] 

  prevMonth() {
    console.log('prev month');
  }

  nextMonth() {
    console.log('next month');
  }

}
