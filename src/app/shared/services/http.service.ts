import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GENERAL_CONFIG } from '../constants/general-config';

@Injectable({
  providedIn: 'root',
})
export class HTTPService {
  constructor(private httpClient: HttpClient) {}

  //wallpapers
  getWallpaperURIs(): Observable<string[]> {
    return this.httpClient.get(
      `${GENERAL_CONFIG.assetsServer}/getWallpapers.php`
    ) as Observable<string[]>;
  }

  downloadWallpaper(name: string): void {
    window.open(
      `${GENERAL_CONFIG.assetsServer}/downloadWallpaper.php?name=${name}`,
      '_blank'
    );
  }
}
