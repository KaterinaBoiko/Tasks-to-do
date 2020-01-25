import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { DesktopPageComponent } from './desktop-page/desktop-page.component';
import { ManagerPageComponent } from './manager-page/manager-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { AuthGuardService } from './shared/services/auth-guard.service';


const routes: Routes = [
  { path: '', component: WelcomePageComponent},
  { path: 'main', component: MainPageComponent},
  { path: 'desktop', component: DesktopPageComponent, canActivate: [AuthGuardService] },
  { path: 'manager', component: ManagerPageComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfilePageComponent},
  { path: 'contacts', component: ContactPageComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
