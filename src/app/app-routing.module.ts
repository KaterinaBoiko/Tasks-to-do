import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { DesktopPageComponent } from './desktop-page/desktop-page.component';
import { ManagerPageComponent } from './manager-page/manager-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';


const routes: Routes = [
  { path: '', component: WelcomePageComponent},
  { path: 'main', component: MainPageComponent},
  { path: 'desktop', component: DesktopPageComponent},
  { path: 'manager', component: ManagerPageComponent},
  { path: 'profile', component: ProfilePageComponent },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
