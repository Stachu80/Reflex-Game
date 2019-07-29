import { Statistics } from './statistics';
import { ReflexElement } from './element';

export class ElementsContainer {
  private elementArray: Array<ReflexElement> = [];
  private statistics: Statistics = new Statistics();
  private greenIndex: number;
  private isSave: boolean = false;
  private clicked: boolean = false;

  constructor(elements: number) {
    for (var i = 0; i < elements; i++) {
      this.elementArray.push(new ReflexElement(i));
    }
    addEventListener('hideGreen', this.hideGreen);
    addEventListener('showGreen', this.showGreen);
    addEventListener('clickElement', this.clickOnTiles);
  }

  set isLocked(locked: boolean) {
    this.elementArray.forEach(element => (element.isLocked = locked));
  }

  public destroy = () => {
    removeEventListener('hideGreen', this.hideGreen);
    removeEventListener('showGreen', this.showGreen);
    removeEventListener('clickElement', this.clickOnTiles);
  };

  public reset = () => {
    this.elementArray.forEach(e => e.reset());
    this.statistics.scores = 0;
    this.statistics.lives = 3;
    this.statistics.updateLives();
    this.statistics.updateScore();
  };

  private clickOnTiles = (e: CustomEvent) => {
    this.isSave = this.greenIndex == e.detail.index;
    this.statisticUpdate();
    this.clicked = true;

    if (this.statistics.lives !== 0) {
      this.isSave
        ? console.log(this.statistics.lives)
        : alert('Klinąłeś nie w ten kwadrat. Straciłeś życie');
    }
    this.lockElements(true);
  };

  private statisticUpdate = () => {
    this.isSave ? ++this.statistics.scores : --this.statistics.lives;
    this.statistics.updateLives();
    this.statistics.updateScore();
    if (this.statistics.lives === 0) {
      dispatchEvent(new CustomEvent('GameOver'));
      alert('Koniec Gry');
    }
  };

  private showGreen = () => {
    this.greenIndex = Math.floor(Math.random() * this.elementArray.length);
    this.lockElements(false);
    this.elementArray[this.greenIndex].changeColor = 'green';
  };

  private hideGreen = () => {
    if (!this.clicked) {
      this.isSave ? console.log('Brawo') : alert('Za poźno. Straciłeś życie');
      this.statisticUpdate();
    }
    this.clicked = false;
    this.isSave = false;
    this.greenIndex = null;
    this.lockElements(false);
  };

  private lockElements = (lock: boolean) => {
    this.elementArray.forEach(element => {
      element.isLocked = lock;
      element.reset();
    });
  };
}
