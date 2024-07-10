export default class Tile {
  private tileElement: HTMLElement;
  private _x: number;
  private _y: number;
  private _value: number;

  constructor(container: HTMLElement, value: number = Math.random() > 0.5 ? 2 : 4) {
    this.tileElement = document.createElement('div');
    this.tileElement.classList.add('tile');
    container.append(this.tileElement);
    this.value = value;
  }

  get value() {
    return this._value;
  }

  set value(v) {
    this._value = v;
    this.tileElement.textContent = v.toString();
    const power = Math.log2(v);
    const backgroundLightness = 100 - power * 9;
    this.tileElement.style.setProperty('--background-lightness', `${backgroundLightness}%`);
    this.tileElement.style.setProperty('--text-lightness', `${backgroundLightness <= 50 ? 90 : 10}%`);
  }

  set x(value: number) {
    this._x = value;
    this.tileElement.style.setProperty('--x', value.toString());
  }

  set y(value: number) {
    this._y = value;
    this.tileElement.style.setProperty('--y', value.toString());
  }

  waitForTransition(isAnimation = false) {
    return new Promise<void>(resolve => {
      this.tileElement.addEventListener(isAnimation ? 'animationend' : 'transitionend', resolve, {
        once: true
      });
    });
  }

  remove() {
    this.tileElement.remove();
  }
}
