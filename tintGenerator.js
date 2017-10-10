import rgb2hsl from 'pure-color/convert/rgb2hsl'
import hsl2rgb from 'pure-color/convert/hsl2rgb'

const {keys} = Object
const compose = (...fns) => (arg) => fns.reduce((res, fn) => fn(res), arg)

const defaultShades = {
  darkest: -24,
  darker: -15,
  dark: -8,
  light: 8,
  lighter: 15,
  lightest: 24
}

const tintHSL = (delta) => ([h, s, l]) => 
  [h, s, l + delta / 50 * (delta < 0 ? l : 100 - l)]

const tintRGB = (delta) => compose(
  rgb2hsl,
  tintHSL(delta),
  hsl2rgb
)
  
const createTints = (colorName, [r, g, b], shades = defaultShades) =>
  keys(shades).reduce((acc, shade) => ({
    ...acc,
    [`${colorName}_${shade}`]: tintRGB(shades[shade])([r, g, b])
  }), {})

export default createTints
