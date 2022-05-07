import { Dictionary } from '../dictionary';
import { IRouting } from '../interfaces/routing';
import { IWallpapers } from '../interfaces/wallpapers';

export class EnglishDictionary implements Dictionary {
  shortName: string = 'en';

  routing: IRouting = {
    main: {
      home: 'Home',
      wallpapers: 'Wallpapers',
    },
  };

  wallpapers: IWallpapers = {
    lockscreen: 'lockScreen',
    homescreen: 'homeScreen',
  };
}
