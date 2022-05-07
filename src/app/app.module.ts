import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './routes/home/home.module';
import { WallpapersModule } from './routes/wallpapers/wallpapers.module';
import { MainNavbarModule } from './shared/components/main-navbar/main-navbar.module';
import { ParticleBackgroundModule } from './shared/components/particle-background/particle-background.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,

    ParticleBackgroundModule,
    MainNavbarModule,

    HomeModule,
    WallpapersModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
