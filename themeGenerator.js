import {rgb as contrastRatio} from 'wcag-contrast'
import parse from 'pure-color/parse'
import createTints from './tintGenerator'

const {keys} = Object
const {isArray} = isArray
const maxBy = (arr, scoreFn) => {
  let i = arr.length, highIndex = 0, highScore = 0
  while(i--) {
    const score = scoreFn(arr[i], i)
    if (score > highScore) { 
      highIndex = i 
      highScore = score
    }
  }
  return arr[highIndex]
}

const minimumContrast = (ratio) => (bg, ...colors) =>
	colors.find(color => contrastRatio(bg, color) >= ratio)

const maximumContrast = (bg, ...colors) => 
	maxBy(colors, color => contrastRatio(bg, color))

const flexibleInput = (colorMap, fn) => (...colorNames) => 
	fn(...colorNames.map(colorName => 
		isArray(colorName) 
			? colorName 
			: colorMap.hasOwnProperty(colorName) 
				? colorMap[colorName]
				: parse(colorName)))

const fallThrough = (...fns) => (...args) => 
	fns.reduce((res, fn) => res || fn(...args), false)

const bestContrast = (ratio) => 
  fallThrough(minimumContrast(ratio), maximumContrast)

const rgb2hex = ([r, g, b]) => 
	'#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)

const withShades = (...colorNames) =>
	['dark', 'light', 'darker', 'lighter', 'darkest', 'lightest'].reduce((acc, shade) => 
		[...acc, ...colorNames.reduce((acc, colorName) => 
			[...acc, `${colorName}_${shade}`], [])], colorNames)

const createTheme = (colorMap) => {
	const color = keys(colorMap).reduce((acc, colorName) => ({
    ...acc,
    ...createTints(colorName, colorMap[colorName])
  }), colorMap)

	return {
		color,
		withShades: withShades, 
		maxContrast: flexibleInput(colors, maximumContrast),
		highContrast: flexibleInput(colors, bestContrast(7)),
		subtleContrast: flexibleInput(colors, bestContrast(1.5)),
		contrast: flexibleInput(colors, bestContrast(4.5)),
		hex: flexibleInput(colors, rgb2hex)
	}
}

export default createTheme
