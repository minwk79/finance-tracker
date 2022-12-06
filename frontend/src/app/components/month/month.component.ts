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
  availableMonths!: any[];

  hasPrevMonth !: boolean;
  hasNextMonth !: boolean;


  constructor(
    private trackersService: TrackersService
  ) { }

  ngOnInit(): void {
    // display current month 
    this.currentMonth = new Date().toISOString().split('T')[0].substring(0, 7);

    const userId = JSON.parse(window.localStorage.getItem('user') || '')?._id;
    this.trackersService.getTrackersByUser(userId).subscribe((trackers: any) => {
      this.trackers = trackers;
      this.availableMonths = trackers.map((tracker: any) => tracker.month).sort((dateA: string, dateB: string) => {
        const [yearA, monthA] = dateA.split('-');
        const [yearB, monthB] = dateB.split('-');
        if (Number(yearA) === Number(yearB)) {
          return Number(monthA) - Number(monthB);
        } else {
          return Number(yearA) - Number(yearB)
        }
      }); // SORT in ASC date order

      // add current month, if not present already.
      if (!this.availableMonths.includes(this.currentMonth)) {
        this.availableMonths.push(this.currentMonth);
      }
      console.log('available', this.availableMonths);

      // set the prev, next buttons appropriately.
      this.hasPrevMonth = this.availableMonths.indexOf(this.currentMonth) >= 1 ? true : false; 
      this.hasNextMonth = false;

      // set the current month's spending, [] if not available.
      this.currentSpendings = trackers.find((tracker: any) => tracker.month === this.currentMonth)?.spendings ?? [];

    })
  }

  // TODO: Create Prev, Next function. use arr.indexOf() to check if either date is valid (inside of trackers array,
  // not out of bounds, etc). If so, change the current month and spendings. 


  prevMonth() {
    let curMonthIdx = this.availableMonths.indexOf(this.currentMonth);
    if (curMonthIdx >= 1) {
      // can go to prev.
      this.currentMonth = this.availableMonths[curMonthIdx-1];
      this.currentSpendings = this.trackers.find((tracker: any) => tracker.month === this.currentMonth)?.spendings ?? [];

      this.hasNextMonth = true;
      this.hasPrevMonth = this.availableMonths.indexOf(this.currentMonth) >= 1 ? true : false; 
    }
  }

  nextMonth() {
    let curMonthIdx = this.availableMonths.indexOf(this.currentMonth);
    if (this.availableMonths[curMonthIdx+1]) {
      // can go next
      this.currentMonth = this.availableMonths[curMonthIdx+1];
      this.currentSpendings = this.trackers.find((tracker: any) => tracker.month === this.currentMonth)?.spendings ?? [];
    } 
    this.hasPrevMonth = true;
    this.hasNextMonth = this.availableMonths[this.availableMonths.indexOf(this.currentMonth)+1] ? true : false;
  }

  // prevMonth() {
  //   let [year, month] = this.currentMonth.split('-');
  //   if (month === '01') {
  //     year = (Number(year) - 1).toString();
  //     month = '12';
  //   } else {
  //     month = (Number(month)- 1 ).toString();
  //   }
  //   let prevMonth = `${year}-${month}`
  //   console.log('prev month is', prevMonth);
  // }

  // nextMonth() {
  //   let [year, month] = this.currentMonth.split('-');
  //   if (month === '12') {
  //     year = (Number(year) + 1).toString();
  //     month = '01';
  //   } else {
  //     month = (Number(month) + 1).toString();
  //   }
  //   let nextMonth = `${year}-${month}`
  //   console.log('next month is', nextMonth);  }

}
