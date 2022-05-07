import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-main-navbar-item',
  templateUrl: './main-navbar-item.component.html',
  styleUrls: ['./main-navbar-item.component.scss'],
})
export class MainNavbarItemComponent implements OnInit {
  @Input()
  route: string = '';

  constructor(private translationService: TranslationService) {}

  get routeName() {
    return new Map(
      Object.entries(this.translationService.currentDictionary.routing.main)
    ).get(this.route);
  }

  get routeHref() {
    return this.route;
  }

  ngOnInit(): void {}
}
