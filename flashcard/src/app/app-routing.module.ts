import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { FlashcardEditComponent } from './flashcard-edit/flashcard-edit.component';
import { FlashcardAddComponent } from './flashcard-add/flashcard-add.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoryPickerComponent } from './category-picker/category-picker.component';
import { StudyComponent } from './study/study.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: 'admin', component: AdminViewComponent},
  {path: 'flashcard/:id', component: FlashcardEditComponent},
  {path: 'add', component: FlashcardAddComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'study/categories', component: CategoryPickerComponent},
  {path: 'inquiry/categories', component: CategoryPickerComponent},
  {path: 'study/:category', component: StudyComponent},
  {path: 'inquiry/:category', component: InquiryComponent},
  {path: 'leaderboard', component: LeaderboardComponent},
  {path: '', component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }