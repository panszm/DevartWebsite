import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { WallpapersComponent } from './routes/wallpapers/wallpapers.component';
import { ROUTING } from './shared/constants/routing';

const routes: Routes = [
  { path: ROUTING.mainRoutes.wallpapers, component: WallpapersComponent },
  { path: '**', redirectTo: ROUTING.mainRoutes.wallpapers },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
