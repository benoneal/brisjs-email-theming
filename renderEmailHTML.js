import {mjml2html} from 'mjml'
import createTheme from './themeGenerator'
import * as templates from './templates'

export default (template, {colors, ...payload}) => 
  mjml2html(templates[template]({
  	...payload,
  	theme: createTheme(colors)
  })).html
