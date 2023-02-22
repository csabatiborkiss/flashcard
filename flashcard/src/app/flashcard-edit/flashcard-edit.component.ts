import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FlashcardService } from '../services/flashcard.service';
import { Flashcard } from '../interfaces/flashcard';

@Component({
  selector: 'app-flashcard-edit',
  templateUrl: './flashcard-edit.component.html',
  styleUrls: ['./flashcard-edit.component.scss']
})

/**
 * Handles the update operation of CRUD
 */
export class FlashcardEditComponent implements OnInit{

  /**
   * flashcard to be edited
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
  constructor(private route: ActivatedRoute, private flashcardService: FlashcardService, private location: Location){}

  /**
   * Sets the flashcard to be edited by its id that we get from GET params
   */
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.flashcard = this.flashcardService.getFlashcard(id);
  }

/**
 * Returns the user to the previous page.
 */
  goBack(): void {
    this.location.back();
  }

  /**
   * Handles the user interaction with the edit form, if there is an error, it displays an error message
   * If edit is successful it clears the fields and returns the user to the admin page
   */
  editFlashcard(){
    if(this.flashcard.category === "" || this.flashcard.hungarianPhrase === ""|| this.flashcard.englishPhrase === "" || this.flashcard.difficulty === undefined
    || this.flashcard.difficulty < 1 || this.flashcard.difficulty > 3){
      this.error = true;
    } else{
      this.flashcardService.editFlashcard(this.flashcard);
      this.error = false;
      this.flashcard.category = "";
      this.flashcard.hungarianPhrase = "";
      this.flashcard.englishPhrase = "";
      this.flashcard.difficulty = 1;
      this.goBack();
    }
  }
}
