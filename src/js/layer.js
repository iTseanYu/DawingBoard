/**
*图层类
* @version  1.0.0
* @author seanYU
*/
export default class Layer {
  constructor (canvasid = undefined) {
    this.canvas = undefined
    if (canvasid) {
      this.canvas = document.getElementById(canvasid)
      // 改变canvas的默认大小，css改变大小会导致图形等比变化，改变大小会导致canvas重绘
      this.canvas.width = this.canvas.offsetWidth
      this.canvas.height = this.canvas.offsetHeight
      this.geom = []
      this._event = {} // 事件回调函数队列
    } else {
      console.error('请输入正确的dom元素id')
    }
  }
  /**
 *图层绘画
 * @param {Object} geom 图形对象
 */
  draw (geom) {
    this.geom.push(geom)
    this.reDraw()
  }
  /**
   * 图层重绘
   */
  reDraw () {
    this.geom.forEach(geom => {
      geom.draw(this.canvas)
    })
  }
  /**
   *
   * @param {String} type 事件名称
   * @param {Function} callback  回调函数
   * [{type:'geo',callback:function()}]
   */
  on (type, callback, categories = 'layer', geom = null) {
    if (!this._event[type]) {
      this._event[type] = [{categories: categories, callback: callback, type: type, geom: geom}]
      this.eventCallbackBind = this.eventCallback.bind(this)
      this.canvas.addEventListener([type], this.eventCallbackBind)
    } else {
      this._event[type].push({categories: categories, callback: callback, type: type, geom: geom})
    }
  }
  /**
   *
   * @param {String} type 事件名称
   * @param {Function} callback  回调函数
   */
  off (type, callback) {
    if (this._event[type] === undefined || this._event[type].length === 0) {
      return false
    } else {
      this._event[type].forEach((e, index) => {
        if (e.callback === callback) {
          this._event[type].splice(index, 1)
        }
      })
    }
  }
  /**
   *事件回调函数
   * @param {Object} event 事件对象
   */
  eventCallback (event) {
    for (let i = 0; i < this._event[event.type].length; i++) {
      if (this._event[event.type][i].categories === 'geom') {
        this._event[event.type][i].geom.isPointInPath(event.layerX, event.layerY) && this._event[event.type][i].callback()
      } else {
        this._event[event.type][i].callback()
      }
    }
  }
}
