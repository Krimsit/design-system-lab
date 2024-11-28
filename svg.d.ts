/**
 * SVG declaration file.
 *
 * Add this file to the ts configuration to define the @svgr/webpack export and import icons
 *
 * EX: tsconfig.lib.json
 * "files": [
 *    ...,
 *    "../<path-to>/svg.d.ts"
 * ]
 */

declare module '*.svg' {
  import type { FC, SVGProps } from 'react'

  export const ReactComponent: FC<SVGProps<SVGSVGElement>>
  const src: string
  export default src
}
