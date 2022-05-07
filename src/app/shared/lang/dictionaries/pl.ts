import { Dictionary } from '../dictionary';
import { IRouting } from '../interfaces/routing';
import { IWallpapers } from '../interfaces/wallpapers';

export class PolishDictionary implements Dictionary {
  shortName: string = 'pl';

  routing: IRouting = {
    main: {
      home: 'Strona główna',
      wallpapers: 'Tapety',
    },
  };

  wallpapers: IWallpapers = {
    lockscreen: 'ekranBlokady',
    homescreen: 'ekranGlowny',
  };
}
