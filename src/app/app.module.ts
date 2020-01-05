import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserService } from './shared/services/user.service';
import { DesktopPageComponent } from './desktop-page/desktop-page.component';
import { ManagerService } from './shared/services/manager.service';
import { DesktopService } from './shared/services/desktop.service';
import { SignInDialogComponent } from './sign-in-dialog/sign-in-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomePageComponent,
    MainPageComponent,
    DesktopPageComponent,
    SignInDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    DesktopService,
    ManagerService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SignInDialogComponent
  ]
})
export class AppModule { }
