import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-wind',
  templateUrl: './wind.component.html',
  styleUrls: ['./wind.component.scss']
})
export class WindComponent implements OnInit {
  @Input() windDirection: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

}
