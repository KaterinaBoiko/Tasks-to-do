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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomePageComponent,
    MainPageComponent,
    DesktopPageComponent,
    SignInDialogComponent,
    TaskOverviewDialogComponent
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
    MatTooltipModule
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
    TaskOverviewDialogComponent
  ]
})
export class AppModule { }
