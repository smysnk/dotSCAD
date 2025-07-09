// Port of src/shape_arc.scad to JSCAD
// Copyright Justin Lin, 2017
// License: LGPL v3

const { geom2 } = require('@jscad/modeling').geometries

function raToXY(r, a) {
  const rad = a * Math.PI / 180
  return [r * Math.cos(rad), r * Math.sin(rad)]
}

function edgeRBegin(origR, a, aStep, m) {
  const half = aStep / 2
  const rad = deg => deg * Math.PI / 180
  return origR * Math.cos(rad(half)) / Math.cos(rad(m * aStep - half - a))
}

function edgeREnd(origR, a, aStep, n) {
  const half = aStep / 2
  const rad = deg => deg * Math.PI / 180
  return origR * Math.cos(rad(half)) / Math.cos(rad(n * aStep + half - a))
}

function frags(radius, segments = 32) {
  return segments
}

function shapeArc(radius, angle, width, widthMode = 'LINE_CROSS', segments) {
  const wOffset = widthMode === 'LINE_CROSS'
    ? [width / 2, -width / 2]
    : widthMode === 'LINE_INWARD'
      ? [0, -width]
      : [width, 0]
  const aStep = 360 / frags(radius, segments)
  const angles = typeof angle === 'number' ? [0, angle] : angle
  const a0 = angles[0]
  const a1 = angles[1]
  const m = Math.floor(a0 / aStep) + 1
  const n = Math.floor(a1 / aStep)
  const rOuter = radius + wOffset[0]
  const rInner = radius + wOffset[1]

  const pts = []
  // outer arc path
  pts.push(raToXY(edgeRBegin(rOuter, a0, aStep, m), a0))
  for (let i = m; i <= n; i++) {
    pts.push(raToXY(rOuter, aStep * i))
  }
  if (a1 !== aStep * n) {
    pts.push(raToXY(edgeREnd(rOuter, a1, aStep, n), a1))
    // inner arc path
    pts.push(raToXY(edgeREnd(rInner, a1, aStep, n), a1))
  }
  // inner arc path
  for (let i = m; i <= n; i++) {
    pts.push(raToXY(rInner, aStep * (n + m - i)))
  }
  pts.push(raToXY(edgeRBegin(rInner, a0, aStep, m), a0))

  return geom2.fromPoints(pts)
}

module.exports = shapeArc
