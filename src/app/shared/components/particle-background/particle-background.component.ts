import { Component, Input, OnInit } from '@angular/core';
import { DEFAULT_STYLES } from 'src/assets/styles/consts';

@Component({
  selector: 'app-particle-background',
  templateUrl: './particle-background.component.html',
  styleUrls: ['./particle-background.component.scss'],
})
export class ParticleBackgroundComponent implements OnInit {
  @Input()
  particleCount: number = DEFAULT_STYLES.PARTICLE_BACKGROUND_PARTICLE_COUNT;

  get particleArray() {
    return new Array(this.particleCount);
  }

  constructor() {}

  ngOnInit(): void {}
}
