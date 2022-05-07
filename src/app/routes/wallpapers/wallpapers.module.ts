import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WallpapersComponent } from './wallpapers.component';
import { WallpaperItemComponent } from './wallpaper-item/wallpaper-item.component';
import { WallpaperTagFiltersComponent } from './wallpaper-tag-filters/wallpaper-tag-filters.component';

@NgModule({
  declarations: [WallpapersComponent, WallpaperItemComponent, WallpaperTagFiltersComponent],
  imports: [CommonModule],
  exports: [WallpapersComponent],
})
export class WallpapersModule {}
