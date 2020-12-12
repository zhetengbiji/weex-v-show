let oldSetStyle

function setStyle (key, value, silent) {
  if (this.__hidden__ && key === 'height' || key === 'overflow') {
    this.__style__[key] = value
    return
  }
  oldSetStyle.call(this, key, value, silent)
}
let oldSetStyles

function setStyles (batchedStyles, silent) {
  if (this.__hidden__ && batchedStyles) {
    if ('height' in batchedStyles) {
      this.__style__.height = batchedStyles.height
      delete batchedStyles.height
    }
    if ('overflow' in batchedStyles) {
      this.__style__.overflow = batchedStyles.overflow
      delete batchedStyles.overflow
    }
  }
  oldSetStyles.call(this, batchedStyles, silent)
}
let oldToStyle

function toStyle () {
  const style = oldToStyle.call(this)
  if (this.__hidden__) {
    Object.assign(style, {
      height: '0',
      overflow: 'hidden'
    })
  }
  return style
}

function update (el, {
  value
}) {
  if (!el.__initVShow__) {
    el.__initVShow__ = true
    const style = el.toStyle()
    const realStyle = el.__realStyle__ = el.__realStyle__ || {}
    realStyle.height = style.height || ''
    realStyle.overflow = style.overflow || ''

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
    oldSetStyles.call(el, {
      height: '0',
      overflow: 'hidden'
    })
  } else {
    oldSetStyles.call(el, el.__realStyle__)
  }
}

export default {
  bind: update,
  update: update
}
