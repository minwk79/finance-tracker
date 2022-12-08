import { Component, OnInit } from '@angular/core';

import { TrackersService } from 'src/app/services/trackers.service';
import { GoalsService } from 'src/app/services/goals.service';
import { SpendingsService } from 'src/app/services/spendings.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  actualMonth !: string;
  currentMonth!: string;
  currentSpendings: string[] = [];

  userMonthlyGoal!: number;
  spendingList!: any[];
  sumOfSpendings!: number;


  trackers!: any[];
  availableMonths!: string[];

  hasPrevMonth !: boolean;
  hasNextMonth !: boolean;

  userId!: string;
  goalId !: string;

  isCurrentMonth!: boolean;

  constructor(
    private trackersService: TrackersService,
    private goalsService: GoalsService,
    private spendingsService: SpendingsService
  ) { }

  ngOnInit(): void {
    // store user id
    const user = JSON.parse(window.localStorage.getItem('user') || '');

    this.userId = user?._id;
    this.goalId = user?.goal;

    // set user monthly goal
    this.goalsService.getGoalById(this.goalId).subscribe((goal: any) => {
      this.userMonthlyGoal = goal.monthly;
    });

    // display current month 
    this.actualMonth = new Date().toISOString().split('T')[0].substring(0, 7);
    this.currentMonth = this.actualMonth;
    this.isCurrentMonth = true;

    console.log('current month:', this.currentMonth);
    console.log('actual month:', this.actualMonth);
    console.log('is it current month?', this.isCurrentMonth );

    this.trackersService.getTrackersByUser(this.userId).subscribe((trackers: any) => {
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

      // set the prev, next buttons appropriately.
      this.hasPrevMonth = this.availableMonths.indexOf(this.currentMonth) >= 1 ? true : false; 
      this.hasNextMonth = false;

      // set the current month's spending, [] if not available.
      this.currentSpendings = trackers.find((tracker: any) => tracker.month === this.currentMonth)?.spendings ?? [];

      this.spendingList = []; 
      this.sumOfSpendings = 0;
      this.currentSpendings.map((spendingId: string) => {
        this.spendingsService.getSpendingById(spendingId)
          .subscribe((spending:any) => {
            this.sumOfSpendings += spending?.amount;
            this.spendingList.push(spending);
          })
      })

    })
  }

  // TODO: Create Prev, Next function. use arr.indexOf() to check if either date is valid (inside of trackers array,
  // not out of bounds, etc). If so, change the current month and spendings. 


  prevMonth() {
    let curMonthIdx = this.availableMonths.indexOf(this.currentMonth);
    if (curMonthIdx >= 1) {
      // can go to prev.
      this.currentMonth = this.availableMonths[curMonthIdx-1];
      this.isCurrentMonth = this.currentMonth === this.actualMonth;
      this.currentSpendings = this.trackers.find((tracker: any) => tracker.month === this.currentMonth)?.spendings ?? [];

      this.hasNextMonth = true;
      this.hasPrevMonth = this.availableMonths.indexOf(this.currentMonth) >= 1 ? true : false; 

      // update spending list and sum of spendings
      this.spendingList = []; 
      this.sumOfSpendings = 0;
      this.currentSpendings.map((spendingId: string) => {
        this.spendingsService.getSpendingById(spendingId)
          .subscribe((spending: any) => {
            this.sumOfSpendings += spending?.amount;
            this.spendingList.push(spending);
          })
      })
    }
  }

  nextMonth() {
    let curMonthIdx = this.availableMonths.indexOf(this.currentMonth);
    if (this.availableMonths[curMonthIdx+1]) {
      // can go next
      this.currentMonth = this.availableMonths[curMonthIdx+1];
      this.isCurrentMonth = this.currentMonth === this.actualMonth;
      this.currentSpendings = this.trackers.find((tracker: any) => tracker.month === this.currentMonth)?.spendings ?? [];
    
      this.hasPrevMonth = true;
      this.hasNextMonth = this.availableMonths[this.availableMonths.indexOf(this.currentMonth)+1] ? true : false;

      // update spending list and sum of spendings
      this.spendingList = []; 
      this.sumOfSpendings = 0;
      this.currentSpendings.map((spendingId: string) => {
        this.spendingsService.getSpendingById(spendingId)
          .subscribe((spending: any) => {
            this.sumOfSpendings += spending?.amount;
            this.spendingList.push(spending);
          })
      })
    } 
  }
  
}
