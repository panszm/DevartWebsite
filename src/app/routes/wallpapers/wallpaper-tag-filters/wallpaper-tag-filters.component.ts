import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WallpapersService } from '../wallpapers.service';

@Component({
  selector: 'app-wallpaper-tag-filters',
  templateUrl: './wallpaper-tag-filters.component.html',
  styleUrls: ['./wallpaper-tag-filters.component.scss'],
})
export class WallpaperTagFiltersComponent implements OnInit {
  tags: Map<string, number> = new Map();
  selectedTags: string[] = [] as string[];

  get isAnyTagSelected(): boolean {
    return this.selectedTags.length > 0;
  }

  constructor(
    private ref: ChangeDetectorRef,
    private wallpapersService: WallpapersService
  ) {}

  ngOnInit(): void {
    this.wallpapersService.tags$.subscribe((tags) => {
      this.tags = tags;
    });
  }

  deselectAll(): void {
    this.selectedTags = [];
    this.onSelectedTagsChange();
  }

  toggleTagSelection(tag: string): void {
    const tagIndex: number = this.selectedTags.indexOf(tag);
    if (tagIndex !== -1) {
      this.selectedTags.splice(tagIndex, 1);
    } else {
      if (this.tags.get(tag)) {
        this.selectedTags.push(tag);
      }
    }
    this.onSelectedTagsChange();
  }

  private onSelectedTagsChange(): void {
    this.wallpapersService.selectedTags = this.selectedTags;
  }

  isTagSelected(tag: string): boolean {
    return this.selectedTags.indexOf(tag) !== -1;
  }
}
