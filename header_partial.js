const {keys} = Object

export default ({
  title,
  bgColor,
  font,
  scale,
  theme: {
    hex,
    contrast,
    withShades
  },
  logo,
  name,
  urls
}) => `
<mj-section background-color='${hex(bgColor)}' padding-bottom='${scale.sm}' padding-top='${scale.sm}' full-width='full-width'>
  <mj-column width='40%' vertical-align='middle'>
    <mj-image href='${urls.homepage}' width='190' src='${logo[hex(contrast(bgColor, ...keys(logo)))]}' alt='${name}'>
    </mj-image>
  </mj-column>
  ${title && `<mj-column width='60%' vertical-align='middle'>
    <mj-text align='right' font-size='13' font-family=${font.primary} color='${hex(contrast(bgColor, ...withShades('light', 'dark', 'action')))}' >
      ${title}
    </mj-text>
  </mj-column>`}
</mj-section>
`
