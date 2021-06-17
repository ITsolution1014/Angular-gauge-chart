import {Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
declare var $: any;




@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})



export class DashComponent implements OnInit {

  // http://0.0.0.0:8000/detection
  // http://0.0.0.0:8000/video_feed
  // http://0.0.0.0:8000/save_result

  subscription: Subscription;

  public duration;
  public reaction_duration_time
  public  prediction_text
  public  percentage;
  public  color
  public  real_time
  public  last_reaction_found_time
  public reaction_assurance;

  public tmp;
  public canvasWidth = 320
  public needleValue = 61
  public centralLabel = ''
  public name = 'Gauge chart'
  public bottomLabel = '65'
  public img_path;
  public time = 0;
  public date_day;
  public flag = false;
  public status = false;
  public options = {
    hasNeedle: false,
    needleColor: '#4F5DE0',
    needleUpdateSpeed: 5000,
    arcColors: ['url(#gradient)', 'lightgray'],

    arcDelimiters: [0.1],
    rangeLabel: ['0%', '100%'],
    needleStartValue: 0,
  }

  public canvasWidth1 = 200
  public needleValue1 = 0;
  public centralLabel1 = ''
  public name1 = 'Gauge chart'
  public bottomLabel1 = '65'
  public options1 = {
    hasNeedle: true,
    needleColor: '#4F5DE0',
    needleUpdateSpeed: 500,
    arcColors: ['none', 'none'],

    arcDelimiters: [1],
    rangeLabel: [],
    needleStartValue: 0,
  }


  constructor(
      private http: HttpClient,
      private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {

    const source = interval(1000);
    this.subscription = source.subscribe(val => this.getApi());
    // Simple GET request with response type <any>

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getApi (){
    this.http.get<any>('http://localhost/api/test.php').subscribe(data => {
      this.duration = data.reaction_duration_time;
      this.reaction_duration_time = getTime(data.reaction_duration_time);
      this.prediction_text = data.prediction_text;
      this.percentage =data.percentage ;
      this.color = "background: radial-gradient(92.74% 81.39% at 20.66% 77.02%, #EECF74 0%, " + data.color + " 100%)";
      this.real_time = data.real_time ;
      this.date_day = new Date().getDate();
      if(data.last_reaction_found_time != ""){
        this.last_reaction_found_time = "זיהוי צבע אחרון ";
      }
      else this.last_reaction_found_time ="לא זוהה צבע בזמן האחרון";

      this.reaction_assurance = data.reaction_assurance;

      this.tmp = data.last_reaction_found_time;
      if(parseFloat(this.percentage) < 0.02){
        this.needleValue1 = 0.01;
        this.options.arcDelimiters = [0.01];
      }
      else{
        this.needleValue1 = this.percentage-0.01;
        this.options.arcDelimiters = [this.percentage-0.01];
      }

      const today = new Date().getTime();

      if(this.duration >= 600 &&this.flag == false){
        this.flag = true;
        // this.options1.hasNeedle = false;
        // $(".check-div2").attr("style","display:flex");
        $("#endReaction").modal("show");
      } else if(this.duration<600 && this.flag == true) {
        this.flag = false;
        // this.options1.hasNeedle = true;
        // $(".check-div2").attr("style","display:none");
      }

       if(this.percentage == 100 && today-this.time > 1000*30*60) {
         this.time = today;
         $("#myModal").modal("show");
       }

       if(this.percentage == 100) {
         this.options1.hasNeedle = false;
         $(".check-div2").attr("style","display:flex");
       }
       else {
         this.options1.hasNeedle = true;
         $(".check-div2").attr("style","display:none");
       }


    });
    this.http.get<any>('http://localhost/api/video.php').subscribe(data => {
       this.img_path = data.path;
    })
  }

  /** Based on the screen size, switch from standard to one column per row */

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


  nobtn() {
    this.http.post<any>('http://0.0.0.0:8000/save_result', { answer: 'no' }).subscribe(data => {

    })
    $("#myModal").modal("hide");
  }
  yesbtn() {
    this.http.post<any>('http://0.0.0.0:8000/save_result', { answer: 'yes' }).subscribe(data => {

    })
    $("#myModal").modal("hide");
  }

  endnobtn() {
    this.http.post<any>('http://0.0.0.0:8000/save_result', { end_reaction_time:this.real_time, duration:this.duration ,answer: 'no' }).subscribe(data => {

    })
    $("#endReaction").modal("hide");
  }
  endyesbtn() {
    this.http.post<any>('http://0.0.0.0:8000/save_result', {end_reaction_time:this.real_time,duration:this.duration, answer: 'yes' }).subscribe(data => {

    })
    $("#endReaction").modal("hide");
  }

}

function getTime(number: number) {
  let result,hour,minute,second;
  second = number % 60;   number = (number-second)/60;
  minute = number % 60;
  hour = (number-minute) / 60;

  result = format_date(hour) + ":" + format_date(minute) + ":" + format_date(second);
  return result;
}

function format_date(number: number) {
  if(number<10) return '0' + number.toString();
  else return number.toString();
}
