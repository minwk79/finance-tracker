import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spending-list',
  templateUrl: './spending-list.component.html',
  styleUrls: ['./spending-list.component.scss']
})
export class SpendingListComponent implements OnInit {

  @Input() spendings!: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
