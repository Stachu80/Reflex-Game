import { Time } from './time';

export class Timer implements Time {
  private time: number = 0;
  private active: boolean = false;
  private interval: number;
  private panel: HTMLElement = document.querySelector('.time p');

  public start = () => {
    !this.active
      ? (this.interval = <any>setInterval(this.startTimer, 10))
      : clearInterval(this.interval);
    this.active = !this.active;
  };

  public reset = () => {
    this.time = 0;
    this.panel.textContent = 'Czas : 0';
    this.active = false;
    clearInterval(this.interval);
  };

  private startTimer = () => {
    this.time++;
    this.colorToggler();
    this.panel.textContent = 'Czas : ' + (this.time / 100).toFixed(2);
  };

  private colorToggler = () => {
    const limit: number = 300;
    const gap: number = 200;
    const condition0: boolean = this.time % limit === 0;
    const condition1: boolean = (this.time - gap) % limit === 0;
    const moreThenLimit: boolean = this.time >= limit;

    let color: string;
    if (condition0) {
      color = 'showGreen';
    }
    if (condition1) {
      color = 'hideGreen';
    }
    if (moreThenLimit) {
      this.dispatchEventEmiter(color);
    }
  };

  private dispatchEventEmiter = (color: string) =>
    dispatchEvent(new CustomEvent(color));
}
