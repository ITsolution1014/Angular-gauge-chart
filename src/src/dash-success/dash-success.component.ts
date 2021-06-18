import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-dash-success',
  templateUrl: './dash-success.component.html',
  styleUrls: ['./dash-success.component.css']
})
export class DashSuccessComponent implements OnInit {

  ngOnInit(): void {
  }

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          one: { id: '1', cols: 10, rows: 2 },
          two: { id: '2', cols: 10, rows: 2 },
          three: { id: '3', cols: 10, rows: 1 },
          four: { id: '4', cols: 10, rows: 1 }
        };
      }

      return {
        one: { id: '1', cols: 3, rows: 2 },
        two: { id: '2', cols: 4, rows: 2 },
        three: { id: '3', cols: 3, rows: 1 },
        four: { id: '4', cols: 3, rows: 1 }
      };
    })
  );



  public canvasWidth = 320
  public needleValue = 90
  public centralLabel = ''
  public name = 'Gauge chart'
  public bottomLabel = '65'
  public options = {
    hasNeedle: false,
    needleColor: '#4F5DE0',
    needleUpdateSpeed: 1000,
    arcColors: ['#1E2999', 'lightgray'],

    arcDelimiters: [90],
    rangeLabel: ['0%', '100%'],
    needleStartValue: 50,
  }

  constructor(private breakpointObserver: BreakpointObserver) {}

}
