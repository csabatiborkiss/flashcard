import { Component, OnInit } from '@angular/core';
import { FlashcardService } from '../services/flashcard.service';
import { Router } from '@angular/router';
import { Flashcard } from '../interfaces/flashcard';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})

/**
 * StudyComponent handles the Study page
 */
export class StudyComponent implements OnInit{

  category = "";
  flashcards: Flashcard[] = [];
  currentFlashcard: Flashcard = {id:-1, hungarianPhrase: "", englishPhrase: "", category: "", difficulty: -1};
  currentFlashcardIndex = 0;
  numOfFlashcards = 0;
  canAnimate = false;
/**
 * 
 * @param flashcardService is used to get the flashcards from the right category
 * @param router is used to get the category from the url
 */
  constructor(private flashcardService: FlashcardService, private router: Router){}
/**
 * fetches the category, then the flashcards, and sets the first one
 */
  ngOnInit(){
    this.category = this.router.url.split('/')[2];
    this.flashcards = this.flashcardService.getFlashcardsByCategory(this.category, true);
    this.currentFlashcard = this.flashcards[this.currentFlashcardIndex];
    this.numOfFlashcards = this.flashcards.length;
  }

  /**
   * increments the currentFlashcardIndex, if its higher than the length of the array it goes back to zero
   */
  getNextFlashcard(){
    this.canAnimate = true;
    if(this.currentFlashcardIndex + 1 >= this.flashcards.length){
      this.currentFlashcardIndex = -1;
    }
    this.currentFlashcard = this.flashcards[++this.currentFlashcardIndex];

  }

  /**
   * Directs the user back to the category picker site
   */
  chooseAnotherCategory(){
    this.router.navigateByUrl('/study/categories');
  }
}
