// Port of src/angle_between.scad and _impl/_angle_between_impl.scad to JSCAD

function dot(v1, v2) {
  return v1[0]*v2[0] + v1[1]*v2[1] + (v1[2]||0)*(v2[2]||0)
}

function length(v) {
  return Math.sqrt(dot(v, v))
}

function cross2D(v1, v2) {
  return v1[0]*v2[1] - v1[1]*v2[0]
}

function angleBetweenCCW2D(v1, v2) {
  const a = Math.atan2(cross2D(v1, v2), dot(v1, v2)) * 180 / Math.PI
  return a >= 0 ? a : a + 360
}

function angleBetweenCCW3D(v1, v2) {
  const a = Math.acos(dot(v1, v2) / Math.sqrt(dot(v1, v1) * dot(v2, v2))) * 180 / Math.PI
  return a >= 0 ? a : a + 360
}

function angleBetween(v1, v2, ccw = false) {
  if (!ccw) {
    const cos = dot(v1, v2) / Math.sqrt(dot(v1, v1) * dot(v2, v2))
    return Math.acos(cos) * 180 / Math.PI
  }
  return v1.length === 2 ? angleBetweenCCW2D(v1, v2) : angleBetweenCCW3D(v1, v2)
}

module.exports = angleBetween
