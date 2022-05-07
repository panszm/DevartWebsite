import { IRouting } from './interfaces/routing';
import { IWallpapers } from './interfaces/wallpapers';
export interface Dictionary {
  shortName: string;

  routing: IRouting;

  wallpapers: IWallpapers;
}
