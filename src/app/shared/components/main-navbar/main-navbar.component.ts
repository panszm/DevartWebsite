import { Component, OnInit } from '@angular/core';
import { ROUTING } from '../../constants/routing';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss'],
})
export class MainNavbarComponent implements OnInit {
  routes: string[] = Object.values(ROUTING.mainRoutes);

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {}
}
