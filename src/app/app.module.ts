import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatNativeDateModule, MAT_DATE_LOCALE  } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserService } from './shared/services/user.service';
import { DesktopPageComponent } from './desktop-page/desktop-page.component';
import { ManagerService } from './shared/services/manager.service';
import { DesktopService } from './shared/services/desktop.service';
import { SignInDialogComponent } from './dialogs/sign-in-dialog/sign-in-dialog.component';
import { TaskOverviewDialogComponent } from './dialogs/task-overview-dialog/task-overview-dialog.component';
import { ManagerPageComponent } from './manager-page/manager-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AddSubordinateDialogComponent } from './dialogs/add-subordinate-dialog/add-subordinate-dialog.component';
import { ContactPageComponent } from './contact-page/contact-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomePageComponent,
    MainPageComponent,
    DesktopPageComponent,
    SignInDialogComponent,
    TaskOverviewDialogComponent,
    ManagerPageComponent,
    PageNotFoundComponent,
    ProfilePageComponent,
    AddSubordinateDialogComponent,
    ContactPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    DragDropModule,
    MatProgressBarModule,
    TextFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatTableModule
  ],
  providers: [
    UserService,
    DesktopService,
    ManagerService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SignInDialogComponent,
    TaskOverviewDialogComponent,
    AddSubordinateDialogComponent
  ]
})
export class AppModule { }
