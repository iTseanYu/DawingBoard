
import geometric from './geometric.js'
/**
*圆类
* @version  1.0.0
* @author seanYU
*/
export default class circle extends geometric {
  /**
   * 构造函数
   * @param {Object} obj 图形构造对象参数
   * @example {geometric：point:{x:0,y:0},radius:10},symbol:{lineWidth:2,strokeStyle:'black'}}   */
  constructor (obj) {
    super()
    this.point = obj.geometric.point
    this.centerpoint = obj.geometric.point
    this.radius = obj.geometric.radius
    this.symbol = obj.symbol === undefined ? this.symbol : obj.symbol
  }

  /**
   *图形绘画
   * @param {Dom} canvas dom元素
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
   * @param {Object} startPoint 绘画起点
   * @param {Object} event 事件对象
   */
  updataGeom (startPoint, event) {
    let ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.point = startPoint
    this.radius = Math.sqrt(Math.pow(event.layerX - startPoint.x, 2) + Math.pow(event.layerY - startPoint.y, 2))
  }
  /*
 * 返回最小矩形范围坐标
 * @return {Array}  [leftup, leftdown, rightdown, rightup]
 */
  getextent () {
    const leftup = {x: this.point.x - this.radius, y: this.point.y - this.radius}
    const leftdown = {x: this.point.x - this.radius, y: this.point.y + this.radius}
    const rightdown = {x: this.point.x + this.radius, y: this.point.y + this.radius}
    const rightup = {x: this.point.x + this.radius, y: this.point.y - this.radius}
    return [leftup, leftdown, rightdown, rightup]
  }
}
