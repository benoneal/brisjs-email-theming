import header from './partials/header'
import download from './partials/download'
import share from './partials/share'
import reactivate from './partials/reactivate'
import footer from './partials/footer_transactional'

export default (payload) => {
  const {
    receipt,
    game,
    font,
    primaryFontSource,
    theme: {
      hex,
      subtleContrast
    }
  } = payload
  
  return `
    <mjml>
      <mj-head>
        <mj-font name=${font.primary} href="${primaryFontSource}" />
      </mj-head>
      <mj-body>
        <mj-container background-color="${hex('mid_darker')}">
          ${header({
            ...payload, 
            bgColor: subtleContrast('dark', 'dark_dark', 'dark_light'), 
            title: `RECEIPT # ${receipt.receiptNumber}`
          })}
          ${download({
            ...payload, 
            bgColor: 'dark', 
            title: `Thanks for purchasing ${game.title}!`
          })}
          ${share({
            ...payload, 
            bgColor: 'mid', 
            title: `While you wait for your download to complete...`
          })}
          ${reactivate({
            ...payload, 
            bgColor: subtleContrast('mid', 'mid_dark', 'mid_light')
          })}
          ${footer({
            ...payload, 
            bgColor: subtleContrast('mid', 'mid_darker', 'mid_lighter')
          })}
        </mj-container>
      </mj-body>
    </mjml>
  `
}
