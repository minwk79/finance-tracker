import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-gauge-bar',
  templateUrl: './gauge-bar.component.html',
  styleUrls: ['./gauge-bar.component.scss']
})
export class GaugeBarComponent implements OnInit {
  @Input() sum!: number;
  @Input() monthly!: number;
  @Input() isCurrentMonth!: boolean;  // set the bar color (gray if not current month, red/green if current month);

  constructor() { }

  ngOnInit(): void {

  }

}
