const hiddenStyle = {
  boxSizing: 'border-box',
  marginTop: '0',
  marginRight: '0',
  marginBottom: '0',
  marginLeft: '0',
  width: '0',
  height: '0',
  overflow: 'hidden'
}

let oldSetStyle

function setStyle (key, value, silent) {
  if (this.__hidden__ && key in hiddenStyle) {
    this.__style__[key] = value
    return
  }
  oldSetStyle.call(this, key, value, silent)
}
let oldSetStyles

function setStyles (batchedStyles, silent) {
  if (this.__hidden__ && batchedStyles) {
    Object.keys(hiddenStyle).forEach(key => {
      if (key in batchedStyles) {
        this.__style__[key] = batchedStyles[key]
        delete batchedStyles[key]
      }
    })
  }
  oldSetStyles.call(this, batchedStyles, silent)
}
let oldToStyle

function toStyle () {
  const style = oldToStyle.call(this)
  if (this.__hidden__) {
    Object.assign(style, hiddenStyle)
  }
  return style
}

function update (el, {
  value
}) {
  if (!el.__initVShow__) {
    el.__initVShow__ = true
    oldSetStyle = el.setStyle
    el.setStyle = setStyle
    oldSetStyles = el.setStyles
    el.setStyles = setStyles
    oldToStyle = el.toStyle
    el.toStyle = toStyle
  }
  const hidden = !value
  if (el.__hidden__ === hidden) {
    return
  }
  el.__hidden__ = hidden
  if (hidden) {
    const oldStyle = oldToStyle.call(el)
    const realStyle = el.__style__ = el.__style__ || {}
    Object.keys(hiddenStyle).forEach(key => {
      realStyle[key] = oldStyle[key] || ''
    })
    oldSetStyles.call(el, hiddenStyle)
  } else {
    oldSetStyles.call(el, el.__style__)
  }
}

export default {
  bind: update,
  update: update
}
