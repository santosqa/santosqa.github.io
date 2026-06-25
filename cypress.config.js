const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'riwe41',
  e2e: {
    baseUrl: 'https://santosqa.github.io',
    setupNodeEvents(on, config) {},
  },
});
