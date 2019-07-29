
export class ReflexElement {
  private locked: boolean | undefined;
  private element: any = document.createElement('reflex-element');
  private box: HTMLElement = document.querySelector('.elements');

  set isLocked(locked: boolean) {
    this.locked = locked;
  }
  set changeColor(color: string) {
    this.element.style.backgroundColor = color;
  }

  constructor( index: number) {
    this.element.addEventListener('click', this.check);
    this.element.isSelected = false;
    this.element.index = index;
    this.box.appendChild(this.element);
  }

  public reset = () => {
    this.element.style.backgroundColor = 'white';
    this.element.isSelected = false;
  };

  private check = () => {
    if (!this.locked) {
      this.element.style.backgroundColor = this.element.isSelected
        ? 'red'
        : 'white';
      this.element.isSelected = !this.element.isSelected;
      dispatchEvent(
        new CustomEvent('clickElement', {
          detail: {
            index: this.element.index
          }
        })
      );
    }
  };
}
