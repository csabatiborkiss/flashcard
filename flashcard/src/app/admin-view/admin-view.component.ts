import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Flashcard } from '../interfaces/flashcard';
import { FlashcardService } from '../services/flashcard.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
/**
 * Handles the admin page and its access, listing all flashcards to perform CRUD operations
 */
export class AdminViewComponent{

  /**
   * All the flashcards that are in the database
   */
  flashcards: Flashcard[] = [];

  /**
   * 
   * @param flashcardService is used to delete flashcard directly from admin page
   * @param userService is used to check admin authentication
   * @param cookieService is used to check admin authentication
   * @param router is used to redirect unauthenticated users
   */
  constructor(private flashcardService: FlashcardService, private userService: UserService, private cookieService: CookieService, private router: Router) {}

  /**
   * ngOnInit is used to initialize the flashcards array and navigate away unauthenticated users
   */
  ngOnInit(){
    this.flashcards = this.flashcardService.getFlashcards();
    this.userService.getUser(this.cookieService.get('uid'))
    .catch(() => {
      this.router.navigate(['/']);
    })
    .then((user) =>{
      if(typeof user === 'undefined'){
        this.router.navigate(['/']);
      } else{
        if(!user.admin || user.admin === undefined){
          this.router.navigate(['/']);
        }
      }
    });
  }
/**
 * Deletes the flashcard then refreshes the page calling ngOnInit
 * @param id id of the flashcard to be deleted
 * 
 */
  deleteFlashcard(id: number){
    this.flashcardService.deleteFlashcard(id).then(() =>{
      this.ngOnInit();
    });
  }
}
