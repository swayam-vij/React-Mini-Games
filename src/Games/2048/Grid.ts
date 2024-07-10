import Tile from './Tile';

const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;

export default class Grid {
  public cells;

  constructor(gridElement: HTMLElement) {
    gridElement.style.setProperty('--grid-size', GRID_SIZE.toString());
    gridElement.style.setProperty('--cell-size', `${CELL_SIZE}vmin`);
    gridElement.style.setProperty('--cell-gap', `${CELL_GAP}vmin`);
    this.cells = createCellElements(gridElement).map((cellElement, index) => {
      return new Cell(cellElement, index % GRID_SIZE, Math.floor(index / GRID_SIZE));
    });
  }

  get cellsByRow() {
    return this.cells.reduce((cellGrid: Cell[][], cell: Cell) => {
      cellGrid[cell.y] = cellGrid[cell.y] || [];
      cellGrid[cell.y][cell.x] = cell;
      return cellGrid;
    }, []);
  }

  get cellsByColumn() {
    return this.cells.reduce((cellGrid: Cell[][], cell: Cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || [];
      cellGrid[cell.x][cell.y] = cell;
      return cellGrid;
    }, []);
  }

  get emptyCells() {
    return this.cells.filter((cell: Cell) => cell.tile == null);
  }

  randomEmptyCell() {
    const randomIndex = Math.floor(Math.random() * this.emptyCells.length);
    return this.emptyCells[randomIndex];
  }
}

class Cell {
  private cellElement: HTMLElement;
  private _x: number;
  private _y: number;
  private _tile: Tile | null;
  private _mergeTile: Tile | null;

  constructor(cellElement: HTMLElement, x: number, y: number) {
    this.cellElement = cellElement;
    this._x = x;
    this._y = y;
    this._tile = null;
    this._mergeTile = null;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get tile() {
    return this._tile;
  }

  set tile(value) {
    this._tile = value;
    if (value == null) return;
    this._tile.x = this._x;
    this._tile.y = this._y;
  }

  get mergeTile() {
    return this._mergeTile;
  }

  set mergeTile(value) {
    this._mergeTile = value;
    if (value == null) return;
    this._mergeTile.x = this._x;
    this._mergeTile.y = this._y;
  }

  canAccept(tile: Tile) {
    return this._tile == null || (this._mergeTile == null && this._tile.value === tile.value);
  }

  mergeTiles() {
    if (this._tile == null || this._mergeTile == null) return;
    this._tile.value = this._tile.value + this._mergeTile.value;
    this._mergeTile.remove();
    this._mergeTile = null;
  }
}

function createCellElements(gridElement: HTMLElement) {
  const cells: HTMLElement[] = [];
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cells.push(cell);
    gridElement.append(cell);
  }
  return cells;
}
