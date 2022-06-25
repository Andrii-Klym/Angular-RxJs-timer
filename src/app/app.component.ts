import { Component} from '@angular/core';
import { interval } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'timer-app';

  sec: any = '0' + 0;
  min: any = '0' + 0;

  content = 'Start';
  startTimer = interval(1000);
  running = false;
  clickCount = 0;
  numberSub: any;
  
  count(): void {
    this.numberSub = this.startTimer.subscribe(() => {
      this.sec++;
      this.sec = this.sec < 10 ? '0' + this.sec : this.sec;
  
      if(this.sec === 60) {
        this.min++;
        this.min = this.min < 10 ? '0' + this.min : this.min;
        this.sec = '0' + 0;
      }
    })
  }

  start(): void {
    if(!this.running) {
        this.content = 'Stop';
        this.running = true;
        this.count();
    } else {
      this.stop();
      this.content = 'Start'
    }
  }

  stop(): void {
    this.numberSub.unsubscribe();
    this.running = false;
  }

  wait(): void {
    this.clickCount++;
    setTimeout(() => {
        if (this.clickCount === 2) {
          this.stop();
          this.content = 'Start'
        }
        this.clickCount = 0;
    }, 500)
}

  reset(): void {
    this.min = this.sec = '0' + 0;    
  }

}
