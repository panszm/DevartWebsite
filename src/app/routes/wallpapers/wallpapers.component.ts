import { Component, OnInit } from '@angular/core';
import { WallpaperModel } from 'src/app/shared/models/WallpaperModel';
import { WallpapersService } from './wallpapers.service';

@Component({
  selector: 'app-wallpapers',
  templateUrl: './wallpapers.component.html',
  styleUrls: ['./wallpapers.component.scss'],
})
export class WallpapersComponent implements OnInit {
  wallpapers: WallpaperModel[] = [] as WallpaperModel[];

  constructor(private wallpapersService: WallpapersService) {}

  ngOnInit(): void {
    this.wallpapersService.filteredWallpapers$.subscribe(
      (wallpapers) => (this.wallpapers = wallpapers)
    );

    this.wallpapersService.initializeData();
  }
}
