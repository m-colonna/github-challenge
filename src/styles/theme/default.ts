const color = {
  white: '#fff',
  lightGray: '#fafafa',
  gray: '#ccc',
  darkGray: '#444',
  apoBlue: '#005091',
  apoRed: '#f00',
  apoOrange: '#fed204',
  lightGrayTint: '#fafafa50',
  apoBlueTint: '#00509111',
  apoOrangeTint: '#fed20422',
  blackTint: '#0001',
} as const

export const theme = {
  color,
} as const

type CustomThemeType = typeof theme

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends CustomThemeType {}
}
