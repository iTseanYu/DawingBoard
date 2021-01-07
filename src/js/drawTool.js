import CircleShip from '@/js/geometric/circle'
import RectangleShip from '@/js/geometric/rectangle'
import EllipseShip from '@/js/geometric/ellipse'
import LineShip from '@/js/geometric/line'
/**
*图形绘画类，负责绘画图形的动作。
* @version  1.0.0
* @author seanYU
*/
export default class DrawTool {
  /**
   *构造函数
   * @param {String} type 类型
   * @param {Object} symbol 样式对象
   */
  constructor (type, symbol) {
    this.type = type// 绘画图形类型
    this.symbol = symbol // 样式对象
    this.layer = null// 绑定的图层
    this.drawgeom = null// 正在绘画的图形对象
  }
  /**
   * 图层绑定
   * @param {Object} layer 对象
   */
  addTo (layer) {
    this.layer = layer
  }
  /**
   *设置绘画类别
   * @param {String} type
   * @param {Object} symbol
   */
  setCategory (type, symbol) {
    this.type = type
    this.symbol = symbol
    this.mouseDownEventBind = this.mouseDownEvent.bind(this)
    this.layer.canvas.addEventListener('mousedown', this.mouseDownEventBind)
  }
  /**
   * 创建绘画图形实例对象
   * @param {String} type  图形类型
   * @param {Object} event  事件监听对象，用于计算位置
   * @return {Object} circle  图形实例
   */
  creatGeo (type, event) {
    let geom = null
    let param = null
    switch (type) {
      case 'circle':
        param = {
          geometric: {
            point: {x: event.layerY, y: event.layerY},
            radius: 0
          },
          symbol: JSON.parse(JSON.stringify(this.symbol))// 深度拷贝，防止对象污染
        }
        geom = new CircleShip(param)
        break
      case 'rectangle':
        param = {
          geometric: {
            point: {x: event.layerY, y: event.layerY},
            width: 0,
            height: 0
          },
          symbol: JSON.parse(JSON.stringify(this.symbol))// 深度拷贝，防止对象污染
        }
        geom = new RectangleShip(param)
        break
      case 'ellipse':
        param = {
          geometric: {
            point: {x: event.layerY, y: event.layerY},
            width: 0,
            height: 0
          },
          symbol: JSON.parse(JSON.stringify(this.symbol))// 深度拷贝，防止对象污染
        }
        geom = new EllipseShip(param)
        break
      case 'line':
        param = {
          geometric: {
            points: [{x: event.layerX, y: event.layerY}]
          },
          symbol: JSON.parse(JSON.stringify(this.symbol))// 深度拷贝，防止对象污染
        }
        geom = new LineShip(param)
        break
    }

    return geom
  }
  /**
   * 鼠标按下事件响应函数
   * @param {Object} event  事件回调对象
   */
  mouseDownEvent (event) {
    this.mouseUpEvent()
    let circle = this.creatGeo(this.type, event)
    circle.addTo(this.layer)
    this.drawgeom = circle
    this.startPoint = {x: event.layerX, y: event.layerY}
    this.mouseMoveEventBind = this.mouseMoveEvent.bind(this)
    this.mouseUpeEventBind = this.mouseUpEvent.bind(this)
    this.layer.canvas.addEventListener('mousemove', this.mouseMoveEventBind)
    this.layer.canvas.addEventListener('mouseup', this.mouseUpeEventBind)
  }
  /**
   * 鼠标移动事件响应函数
   * @param {Object} event  事件回调对象
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
  /**
  * 设置样式
  * @param {Object} symbol
  */
  setSymbol (symbol) {
    this.symbol = symbol
  }
}
