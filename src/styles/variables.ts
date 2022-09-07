/* eslint-disable @typescript-eslint/naming-convention */

export const PAGE_MAX_WIDTH = '1024px' // TODO: Update to tablet resolution if possible

// eslint-disable-next-line no-shadow
export enum FontWeight {
  Normal = 400,
  Bold = 700,
}

// eslint-disable-next-line no-shadow
export enum FontFamily {
  Main = 'NimbusSansL, Helvetica Neue, sans-serif',
}

// eslint-disable-next-line no-shadow
export enum zIndex {
  Content,
  Navigation,
}

// eslint-disable-next-line no-shadow
export enum CurrentView {
  PopularScreen = 'Popular',
  SavedScreen = 'Saved',
}

// eslint-disable-next-line no-shadow
export enum CurrentState {
  Default = 'isDefault',
  Loading = 'isLoading',
  Success = 'isSuccess',
  Error = 'isError',
}
