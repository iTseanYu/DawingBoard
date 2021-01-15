import CircleShip from '@/js/geometric/circle'
import RectangleShip from '@/js/geometric/rectangle'
import EllipseShip from '@/js/geometric/ellipse'
import LineShip from '@/js/geometric/line'
import PolygonShip from '@/js/geometric/polygon'

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
    this.clearDraw()
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
      case 'polygon':
        param = {
          geometric: {
            points: [{x: event.layerX, y: event.layerY}, {x: event.layerX, y: event.layerY}]
          },
          symbol: JSON.parse(JSON.stringify(this.symbol))// 深度拷贝，防止对象污染
        }
        geom = new PolygonShip(param)
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
    // 多边形的绘画机制不同
    if (this.drawgeom.type === 'polygon') {
      this.mouseMoveEventBind = this.mouseMoveEvent.bind(this)
      this.layer.canvas.addEventListener('mousemove', this.mouseMoveEventBind)
      this.clickEventBind = this.clickEvent.bind(this)
      this.layer.canvas.addEventListener('click', this.clickEventBind)
      this.layer.canvas.removeEventListener('mousedown', this.mouseDownEventBind)
    } else {
      this.mouseMoveEventBind = this.mouseMoveEvent.bind(this)
      this.mouseUpeEventBind = this.mouseUpEvent.bind(this)
      this.layer.canvas.addEventListener('mousemove', this.mouseMoveEventBind)
      this.layer.canvas.addEventListener('mouseup', this.mouseUpeEventBind)
    }
  }
  /**
   * 多边形绘画点击事件回调
   * @param {Object} event
   */
  clickEvent (event) {
    this.drawgeom.appendPoint({x: event.layerX, y: event.layerY})
    this.dbClickEventtBind = this.dbClickEvent.bind(this)
    this.layer.canvas.addEventListener('dblclick', this.dbClickEventtBind)
  }
  /**
   * 多边形绘画双击结束事件回调
   *
   */
  dbClickEvent () {
    this.layer.canvas.removeEventListener('click', this.clickEventBind)
    this.layer.canvas.removeEventListener('dblclick', this.dbClickEventtBind)
    this.layer.canvas.removeEventListener('mousemove', this.mouseMoveEventBind)
    // 重新开始绘画
    this.setCategory(this.type, this.symbol)
  }
  /**
   * 鼠标移动事件响应函数
   * @param {Object} event  事件回调对象
   */
  mouseMoveEvent (event) {
    this.drawgeom._updataGeom(this.startPoint, event)
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
    this.layer.canvas.removeEventListener('mousedown', this.mouseDownEventBind)
    this.layer.canvas.removeEventListener('click', this.clickEventBind)
    this.layer.canvas.removeEventListener('dblclick', this.dbClickEventtBind)
  }
  /**
  * 设置样式
  * @param {Object} symbol
  */
  setSymbol (symbol) {
    this.symbol = symbol
  }
  closeDraw () {
    this.clearDraw()
  }
}
