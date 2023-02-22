import { Component, OnInit } from '@angular/core';
import { Flashcard } from '../interfaces/flashcard';
import { ActivatedRoute } from '@angular/router';
import { FlashcardService } from '../services/flashcard.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-flashcard-add',
  templateUrl: './flashcard-add.component.html',
  styleUrls: ['./flashcard-add.component.scss']
})
/**
 * Handles the creation operation of CRUD
 * 
 */
export class FlashcardAddComponent implements OnInit{

  /**
   * The flashcard to be added
   */
  flashcard: Flashcard = {id:-1, hungarianPhrase: "", englishPhrase: "", category: "", difficulty: -1};

  /**
   * If the user gives wrong input this variable will be set to true
   */
  error = false;

  /**
   * 
   * @param route is used to get id from GET parameters
   * @param flashcardService is used to call the editFlashcard function
   * @param location is used to go back to the previous page
   */
  constructor(private route: ActivatedRoute, private flashcardService: FlashcardService, private location: Location) {}

  /**
   * Sets the id of the flashcard to the next available and every other attribute to blank (difficulty - 1)
   */
  ngOnInit(){
    this.flashcard = {id:this.flashcardService.getNextAvailableId(), hungarianPhrase: "", englishPhrase: "", category: "", difficulty: 1};
  }

/**
 * Returns the user to the previous page
 */
  goBack(): void {
    this.location.back();
  }

 /**
   * Handles the user interaction with the add form, if there is an error, it resets the fields and displays an error message
   * If add is successful it clears the fields and returns the user to the admin page
   */
  addFlashcard(){
    if(this.flashcard.category === "" || this.flashcard.hungarianPhrase === ""|| this.flashcard.englishPhrase === ""
    || this.flashcard.difficulty === undefined || this.flashcard.difficulty < 1 || this.flashcard.difficulty > 3){
      this.error = true;
      this.flashcard.category = "";
      this.flashcard.hungarianPhrase = "";
      this.flashcard.englishPhrase = "";
      this.flashcard.difficulty = 1;
    } else{
      this.flashcardService.addFlashcard(this.flashcard);
      this.error = false;
      this.flashcard.category = "";
      this.flashcard.hungarianPhrase = "";
      this.flashcard.englishPhrase = "";
      this.flashcard.difficulty = 1;
      this.goBack();
    }
  }
}
