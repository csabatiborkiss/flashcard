import { Component, OnInit } from '@angular/core';
import { Flashcard } from '../interfaces/flashcard';
import { FlashcardService } from '../services/flashcard.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss']
})

/**
 * InquiryComponent handles the inquiry "game"
 */
export class InquiryComponent implements OnInit{

  category = "";
  flashcards: Flashcard[] = [];
  currentFlashcard: Flashcard = {id:-1, hungarianPhrase: "", englishPhrase: "", category: "", difficulty: -1};
  currentFlashcardIndex = 0;
  correctGuesses = 0;
  incorrectGuesses = 0;
  score = 0;
  flipped = false;
  canAnimate = false;
  isGameOver = false;
  newHighScore = false;
/**
 * 
 * @param flashcardService is used to fetch Flashcards based on the user-given category
 * @param router obtains the category from the url
 * @param userService is used to update user's highscore
 * @param cookieService is used to update user's highscore
 */
  constructor(private flashcardService: FlashcardService, private router: Router, private userService: UserService, private cookieService: CookieService){}
/**
 * Fetches the category, its flashcards and sets the first one
 */
  ngOnInit(): void {
    this.category = this.router.url.split('/')[2];
    this.flashcards = this.flashcardService.getFlashcardsByCategory(this.category, false);
    this.currentFlashcard = this.flashcards[this.currentFlashcardIndex];
  }
/**
 * gets the next flashcard of the array, but if that would be the 11th or there aren't any cards left it calls the gameover function
 * 
 */
  getNextFlashcard(){
    if(this.currentFlashcardIndex + 1 >= this.flashcards.length){
      this.gameOver();
      return;
    }
    this.currentFlashcardIndex++;
    this.currentFlashcard = this.flashcards[this.currentFlashcardIndex];
    this.flipped = false;

  }
/**
 * Handles the event when the user wants to see the solution and flip the card
 */
  flipFlashcard(){
    this.canAnimate = true;
    if(!this.flipped){
      this.flipped = true;
    }
  }

  /**
   * sets the gameover attribute true if the user scored higher than their previous high score it also updates that
   */
  async gameOver(){
    this.isGameOver = true;
    const user = await this.userService.getUser(this.cookieService.get('uid'));
    if(this.score > user.highScore){
      this.newHighScore = true;
      this.userService.updateHighScore(user,this.score);
    }
  }

  /**
   * 
   * @param id html dom id of basket picture
   * @param scale css scale value
   */
  setBasketSize(id: string, scale: number){
    const basket = document.getElementById(id);
    if(basket !== null){
      basket.style.transform = 'scale('+String(scale)+')';
      basket.style.transition = "transform 0.25s ease";
    }
    
  }

  /**
   * Handles the incorrect button click event, increments the incorrect counter, calls the getNextFlashcard() func to continue the game
   * and it makes the red basket bigger
   */
  incorrect(){
    this.setBasketSize('correct-basket', 1);
    this.setBasketSize('incorrect-basket', 1.2);
    this.incorrectGuesses++;
    this.getNextFlashcard();
  }

  /**
   * Handles the correct button click event, increments the correct counter and calls the getNextFlashcard() func to continue the game, also adds the 
   * appropriate score based on the difficulty of the guessed card and makes the green basket bigger
   */
  correct(){
    this.setBasketSize('correct-basket', 1.2);
    this.setBasketSize('incorrect-basket', 1);
    this.correctGuesses++;
    this.score += Number(this.currentFlashcard.difficulty);
    this.getNextFlashcard();
  }

  /**
   * Resets the game, but keeps the flashcards used in the previous round
   */
  retryWithSameCards(){
    this.resetGame(this.flashcards);
  }

  /**
   * Resets the game, getting new random flashcards
   */
  retryWithNewCards(){
    this.resetGame();
  }

  /**
   * Navigates the user back to the category choosing site
   */
  chooseAnotherCategory(){
    this.router.navigateByUrl('/inquiry/categories');
  }

  /**
   * Resets everything regarding the game to their default values (except possibly the flashcards)
   * @param presetFlashcards [] by default (if they were to be reset), if given it will use those cards in the next round
   */
  resetGame(presetFlashcards: Flashcard[] = []){
    if(presetFlashcards.toString() === [].toString()){
      this.flashcards = this.flashcardService.getFlashcardsByCategory(this.category, false);
    } else{
      this.flashcards = presetFlashcards;
    }
    this.currentFlashcardIndex = 0;
    this.correctGuesses = 0;
    this.incorrectGuesses = 0;
    this.score = 0;
    this.flipped = false;
    this.isGameOver = false;
    this.newHighScore = false;
    this.canAnimate = false;
    this.setBasketSize('correct-basket', 1);
    this.setBasketSize('incorrect-basket', 1);
  }
}
