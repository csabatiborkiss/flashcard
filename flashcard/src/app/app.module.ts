import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AppRoutingModule } from './app-routing.module';
import { FlashcardEditComponent } from './flashcard-edit/flashcard-edit.component';
import { FlashcardAddComponent } from './flashcard-add/flashcard-add.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { SigninComponent } from './signin/signin.component';
import { AuthService } from './services/auth.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import {CookieService} from 'ngx-cookie-service';
import { ProfileComponent } from './profile/profile.component';
import { CategoryPickerComponent } from './category-picker/category-picker.component';
import { StudyComponent } from './study/study.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    AdminViewComponent,
    FlashcardEditComponent,
    FlashcardAddComponent,
    SigninComponent,
    ProfileComponent,
    CategoryPickerComponent,
    StudyComponent,
    InquiryComponent,
    LeaderboardComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [AuthService, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
