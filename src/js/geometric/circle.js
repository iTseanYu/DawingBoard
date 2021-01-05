
/**
 * 圆
 */
import geometric from './geometric.js'
export default class circle extends geometric {
  constructor (obj) {
    super()
    this.point = obj.geometric.point
    this.radius = obj.geometric.radius
    this.symbol = obj.symbol === undefined ? this.symbol : obj.symbol
  }
  /**
   * 图形绘画
   */
  draw (canvas) {
    this.canvas = canvas
    let ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.lineWidth = this.symbol.lineWidth
    ctx.strokeStyle = this.symbol.strokeStyle
    ctx.arc(this.point.x, this.point.y, this.radius, 0, Math.PI * 2, false)
    ctx.stroke()
  }
  /**
   * 更新图形
   */
  updataGeom (startPoint, event) {
    let ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.point = startPoint
    this.radius = Math.sqrt(Math.pow(event.layerX - startPoint.x, 2) + Math.pow(event.layerY - startPoint.y, 2))
    // this.draw(this.canvas)
  }
}
