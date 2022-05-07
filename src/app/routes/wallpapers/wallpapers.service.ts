import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GENERAL_CONFIG } from 'src/app/shared/constants/general-config';
import { WALLPAPERS_CONSTS } from 'src/app/shared/constants/wallpapers-consts';
import { WallpaperModel } from 'src/app/shared/models/WallpaperModel';
import { HTTPService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class WallpapersService {
  private _wallpapers: WallpaperModel[] = [] as WallpaperModel[];

  private filteredWallpapersSource: BehaviorSubject<WallpaperModel[]> =
    new BehaviorSubject<WallpaperModel[]>([] as WallpaperModel[]);
  filteredWallpapers$: Observable<WallpaperModel[]> =
    this.filteredWallpapersSource.asObservable();

  private tagsSource: BehaviorSubject<Map<string, number>> =
    new BehaviorSubject<Map<string, number>>(new Map<string, number>());
  tags$: Observable<Map<string, number>> = this.tagsSource.asObservable();

  private _selectedTags: string[] = [] as string[];
  get selectedTags(): string[] {
    return this._selectedTags;
  }
  set selectedTags(selectedTags: string[]) {
    this._selectedTags = selectedTags;
    this.applyFilters();
  }

  constructor(private httpService: HTTPService) {}

  initializeData() {
    this.prepareWallpapers();
  }

  applyFilters() {
    const filteredWallpapers = this.filterWallpapers(this._wallpapers);
    this.filteredWallpapersSource.next(filteredWallpapers);
    this.tagsSource.next(
      this.extractAllTagsWithCounts(this._wallpapers, filteredWallpapers)
    );
  }

  prepareWallpapers() {
    this.httpService.getWallpaperURIs().subscribe((wallpaperURIs: string[]) => {
      this._wallpapers = this.prepareWallpaperModels(wallpaperURIs);
      this.applyFilters();
    });
  }

  downloadWallpaper(name: string): void {
    this.httpService.downloadWallpaper(name);
  }

  private filterWallpapers(wallpapers: WallpaperModel[]): WallpaperModel[] {
    let filteredWallpapers: WallpaperModel[] = wallpapers;
    filteredWallpapers = filteredWallpapers.filter((wallpaper) =>
      this.selectedTags.every(
        (selectedTag) => wallpaper.tags.indexOf(selectedTag) !== -1
      )
    );
    return filteredWallpapers;
  }

  private extractAllTagsWithCounts(
    wallpapers: WallpaperModel[],
    filteredWallpapers: WallpaperModel[]
  ): Map<string, number> {
    const tags: Map<string, number> =
      this.extractTagsFromWallpapers(wallpapers);

    for (const wallpaper of filteredWallpapers) {
      for (const tag of wallpaper.tags) {
        tags.set(tag, (tags.get(tag) ?? 0) + 1);
      }
    }

    return tags;
  }

  private extractTagsFromWallpapers(
    wallpapers: WallpaperModel[]
  ): Map<string, number> {
    const tags: Map<string, number> = new Map<string, number>();

    for (const wallpaper of wallpapers) {
      for (const tag of wallpaper.tags) {
        if (tags.get(tag) === undefined) {
          tags.set(tag, 0);
        }
      }
    }

    return tags;
  }

  private prepareWallpaperModels(wallpaperNames: string[]): WallpaperModel[] {
    const result: WallpaperModel[] = [];
    const names: string[] = this.prepareNameList(wallpaperNames);
    for (const name of names) {
      result.push(this.prepareWallpaperModel(name));
    }
    return result;
  }

  private prepareWallpaperModel(name: string): WallpaperModel {
    const wallpaperPrefix: string = name.split(
      WALLPAPERS_CONSTS.nameDelimiter
    )[0];
    const wallpaperId: number = parseInt(wallpaperPrefix);
    return {
      id: wallpaperId,
      name: name.replace(
        `${wallpaperPrefix}${WALLPAPERS_CONSTS.nameDelimiter}`,
        ''
      ),
      homescreenSrc: `${WALLPAPERS_CONSTS.fileLocation}/${name}${WALLPAPERS_CONSTS.homeScreenSufix}${WALLPAPERS_CONSTS.fileExtension}`,
      lockscreenSrc: `${WALLPAPERS_CONSTS.fileLocation}/${name}${WALLPAPERS_CONSTS.lockScreenSufix}${WALLPAPERS_CONSTS.fileExtension}`,
      tags: [],
    };
  }

  private prepareNameList(wallpaperNames: string[]): string[] {
    const result: string[] = [];
    for (const wallpaperName of wallpaperNames) {
      let name: string = '';
      if (wallpaperName.includes(WALLPAPERS_CONSTS.homeScreenSufix)) {
        name = wallpaperName.replace(
          `${WALLPAPERS_CONSTS.homeScreenSufix}${WALLPAPERS_CONSTS.fileExtension}`,
          ''
        );
      } else if (wallpaperName.includes(WALLPAPERS_CONSTS.lockScreenSufix)) {
        name = wallpaperName.replace(
          `${WALLPAPERS_CONSTS.lockScreenSufix}${WALLPAPERS_CONSTS.fileExtension}`,
          ''
        );
      }
      if (
        wallpaperNames.filter((element: string) => element.includes(name))
          .length == WALLPAPERS_CONSTS.imageCountPerModel
      ) {
        result.push(name);
      }
      wallpaperNames = wallpaperNames.filter(
        (element: string) => !element.includes(name)
      );
    }
    return result;
  }
}
