function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export interface Coord {
  x: number
  y: number
}

export type EaseMode =
  | 'linear'
  | 'easeInCubic'
  | 'easeOutQuart'
  | 'easeInOutQuad'

export class Bezier3 {
  readonly p0: Coord
  readonly p1: Coord
  readonly p2: Coord
  readonly p3: Coord
  easeMode: EaseMode = 'linear'
  step: number = 100
  private _currStep: number = 0
  private t: number = 0

  get currStep() {
    return this._currStep
  }

  private set currStep(newCurrStep: number) {
    this._currStep = newCurrStep
  }

  constructor(p0: Coord, p1: Coord, p2: Coord, p3: Coord) {
    this.p0 = p0
    this.p1 = p1
    this.p2 = p2
    this.p3 = p3
  }

  static getFixedEnds(
    start: Coord | undefined,
    end: Coord | undefined,
    xMin: number,
    xMax: number,
    yMin: number,
    yMax: number,
  ) {
    const p0 = start || { x: getRandom(xMin, xMax), y: getRandom(yMin, yMax) }
    const p1 = { x: getRandom(xMin, xMax), y: getRandom(yMin, yMax) }
    const p2 = { x: getRandom(xMin, xMax), y: getRandom(yMin, yMax) }
    const p3 = end || { x: getRandom(xMin, xMax), y: getRandom(yMin, yMax) }
    return new Bezier3(p0, p1, p2, p3)
  }

  private ease(t: number) {
    switch (this.easeMode) {
      case 'linear':
        return t
      case 'easeInCubic':
        return t * t * t
      case 'easeOutQuart':
        return 1 - (1 - t) * (1 - t) * (1 - t) * (1 - t)
      case 'easeInOutQuad':
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      default:
        return t
    }
  }

  pointAt(t: number) {
    if (t < 0 || t > 1) throw new Error(`t is out of range: ${t}`)
    const c = 1 - t
    const e0 = c * c * c
    const e1 = 3 * c * c * t
    const e2 = 3 * c * t * t
    const e3 = t * t * t
    return {
      x: e0 * this.p0.x + e1 * this.p1.x + e2 * this.p2.x + e3 * this.p3.x,
      y: e0 * this.p0.y + e1 * this.p1.y + e2 * this.p2.y + e3 * this.p3.y,
    }
  }

  hasNext() {
    return this.t < 1
  }

  next() {
    if (this.currStep > this.step) throw new Error(`End of curve`)
    this.t = this.currStep / this.step
    this.currStep += 1
    return this.pointAt(this.ease(this.t))
  }
}
