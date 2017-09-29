import { createWebdriver } from 'screenie-webdriver'
import ip from 'ip'

const VIEWPORT_HEIGHT = 1024

const VIEWPORT_SIZES = {
  mobile: { width: 375, height: VIEWPORT_HEIGHT },
  tablet: { width: 768, height: VIEWPORT_HEIGHT },
  desktop: { width: 1280, height: VIEWPORT_HEIGHT },
}

const BASE_URL_MAP = {
  chrome: 'web',
  native: 'native',
}

module.exports = createWebdriver({
  browserPoolConcurrency: {
    docker: 3,
  },

  config: matrix => ({
    port: 4444,
    desiredCapabilities: {
      browserName: 'chrome',
      chromeOptions: {
        args: ['headless', 'disable-gpu'],
      },
    },

    baseUrl: `http://${ip.address()}:8089/#/${BASE_URL_MAP[matrix.browser]}`,
    viewportSize: VIEWPORT_SIZES[matrix.viewport],
    browserPool: 'docker',
  }),
})
