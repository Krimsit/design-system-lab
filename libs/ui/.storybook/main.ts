import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { mergeConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'

import { startServer, registerTestsAddon } from '../addon-test'

import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/lib/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: ['@storybook/addon-essentials', registerTestsAddon],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    startServer()

    return mergeConfig(config, {
      plugins: [
        react(),
        svgr({
          include: /(?<=\/(global|custom|altbox|sports)\/.+)\.svg/,
          svgrOptions: {
            plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
            exportType: 'named',
            ref: true,
            titleProp: true,
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'convertColors',
                  params: {
                    currentColor: true,
                  },
                },
              ],
            },
          },
        }),
        svgr({
          include: /(?<=\/(flags|assets)\/.+)\.svg/,
          svgrOptions: {
            exportType: 'named',
            ref: true,
            titleProp: true,
            svgo: true,
          },
        }),
        nxViteTsPaths(),
      ],
    })
  },
}

export default config
