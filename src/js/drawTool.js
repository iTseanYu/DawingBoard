
import CircleShip from '@/js/geometric/circle'

/**
 * 绘画类
 */
export default class DrawTool {
  constructor (type = null) {
    this.type = type
  }
  addTo (layer) {
    this.layer = layer
  }
  /**
   * 设置类别
   */
  setCategory (type, symbol) {
    this.type = type
    this.symbol = symbol
    this.mouseDownEventBind = this.mouseDownEvent.bind(this)
    this.layer.canvas.addEventListener('mousedown', this.mouseDownEventBind)
  }
  /**
   * 创建图形实例
   */
  creatGeo (type, event) {
    let param = {
      geometric: {
        point: {x: event.layerY, y: event.layerY},
        radius: 0
      },
      symbol: this.symbol
    }
    let circle = new CircleShip(param)
    circle.addTo(this.layer)
    this.drawgeom = circle
  }
  /**
   * 鼠标按下事件响应函数
   */
  mouseDownEvent (event) {
    this.creatGeo(this.type, event)
    this.startPoint = {x: event.layerX, y: event.layerY}
    this.mouseMoveEventBind = this.mouseMoveEvent.bind(this)
    this.mouseUpeEventBind = this.mouseUpEvent.bind(this)
    this.layer.canvas.addEventListener('mousemove', this.mouseMoveEventBind)
    this.layer.canvas.addEventListener('mouseup', this.mouseUpeEventBind)
  }
  /**
   * s鼠标移动事件响应函数
   */
  mouseMoveEvent (event) {
    this.drawgeom.updataGeom(this.startPoint, event)
    this.layer.reDraw()
  }
  /**
   * 鼠标抬起事件响应函数
   */
  mouseUpEvent () {
    this.layer.canvas.removeEventListener('mousemove', this.mouseMoveEventBind)
    this.layer.canvas.removeEventListener('mouseUp', this.mouseUpeEventBind)
  }
  /**
   * 清除绘画状态
   */
  clearDraw () {
    this.layer.canvas.removeEventListener('mousemove', this.mouseMoveEventBind)
    this.layer.canvas.removeEventListener('mouseUp', this.mouseUpeEventBind)
    this.layer.canvas.addEventListener('mousedown', this.mouseDownEventBind)
  }
}
