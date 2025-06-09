const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // ✅ agora igual ao fetch
    chromeWebSecurity: false // ✅ ajuda com CORS
  }
})
