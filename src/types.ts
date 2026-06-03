export interface RambleNote {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  version: string;
  date: string;
  lastEdited: string;
}

export type ScreenType =
  | 'ramble-landing-page'
  | 'ramble-home-dark'
  | 'ramble-home-light'
  | 'ramble-editor-dark'
  | 'ramble-editor-light';

export interface Companion {
  id: string;
  name: string;
  prompt: string;
  avatarColor: string;
}
