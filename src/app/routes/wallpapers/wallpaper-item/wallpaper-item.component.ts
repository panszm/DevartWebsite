import { Component, Input, OnInit } from '@angular/core';
import { WALLPAPERS_CONSTS } from 'src/app/shared/constants/wallpapers-consts';
import { WallpaperModel } from 'src/app/shared/models/WallpaperModel';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { WallpapersService } from '../wallpapers.service';

@Component({
  selector: 'app-wallpaper-item',
  templateUrl: './wallpaper-item.component.html',
  styleUrls: ['./wallpaper-item.component.scss'],
})
export class WallpaperItemComponent implements OnInit {
  @Input()
  wallpaper: WallpaperModel | null = null;

  isShowingLockScreen: boolean = true;

  get lockScreenName(): string {
    return `${this.wallpaper?.name}_${this.translationService.currentDictionary.wallpapers.lockscreen}`;
  }

  get homeScreenName(): string {
    return `${this.wallpaper?.name}_${this.translationService.currentDictionary.wallpapers.homescreen}`;
  }

  get lockScreenLabel(): string {
    return this.translationService.currentDictionary.wallpapers.lockscreen;
  }

  get homeScreenLabel(): string {
    return this.translationService.currentDictionary.wallpapers.homescreen;
  }

  get toggleLabel(): string {
    return this.translationService.currentDictionary.wallpapers.toggle;
  }

  get downloadLabel(): string {
    return this.translationService.currentDictionary.wallpapers.download;
  }

  constructor(
    private translationService: TranslationService,
    private wallpaperService: WallpapersService
  ) {}

  ngOnInit(): void {}

  toggleShowingLockScreen() {
    this.isShowingLockScreen = !this.isShowingLockScreen;
  }

  download() {
    if (!this.wallpaper) {
      return;
    }

    let name = this.isShowingLockScreen
      ? this.wallpaper.lockscreenSrc
      : this.wallpaper.homescreenSrc;

    name = name.split('/')[name.split('/').length - 1];
    name = name.replace(WALLPAPERS_CONSTS.fileExtension, '');

    this.wallpaperService.downloadWallpaper(name);
  }
}
