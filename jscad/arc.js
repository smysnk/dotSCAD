// Port of src/arc.scad to JSCAD
const { geom2 } = require('@jscad/modeling').geometries
const shapeArc = require('./shapeArc')

function arc(radius, angle, width = 1, widthMode = 'LINE_CROSS', segments) {
  return shapeArc(radius, angle, width, widthMode, segments)
}

module.exports = arc
