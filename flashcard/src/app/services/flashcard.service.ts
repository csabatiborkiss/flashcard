import { Injectable } from '@angular/core';
import { Flashcard } from '../interfaces/flashcard';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { environment } from "../../environments/environment";
import { collection, doc, setDoc, getDocs, query, deleteDoc } from "firebase/firestore"; 

@Injectable({
  providedIn: 'root'
})
/**
 * FlashcardService class deals with the CRUD operations of Flashcard objects and the connection to the database
 */
export class FlashcardService {
/**
 * flashcards: Flashcard[] all the flashcards in the db
 * app: Firebase instance
 * db: Firestore instance 
 */
  flashcards: Flashcard[] = [];
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  /**
   * updates the contents of the flashcards array by querying the db
   */
  async updateFlashcards(){

    this.flashcards = [];

    const q = query(collection(this.db, "flashcard"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      
      const id: number = doc.data()['id'];
      const hungarianPhrase: string = doc.data()['hungarianPhrase'];
      const englishPhrase: string = doc.data()['englishPhrase'];
      const category: string = doc.data()['category'];
      const difficulty: number = doc.data()['difficulty'];

      const flashcard: Flashcard = {id: id, hungarianPhrase: hungarianPhrase, englishPhrase: englishPhrase, category: category, difficulty: difficulty};
      this.flashcards.push(flashcard);
    });
    
  }

/**
 * updates flashcards array using the data from the database
 * @returns the updated array
 */
  getFlashcards(): Flashcard[]{
    this.updateFlashcards();
    return this.flashcards;
  }

  /**
   * 
   * @param id id of the Flashcard object we want to retrieve
   * @returns a Flashcard object with the specified id
   */
  getFlashcard(id: number): Flashcard{
    const flashcard = this.flashcards.find(f => f.id === id);
    if(flashcard === undefined){
      return {id: -1, hungarianPhrase: 'error', englishPhrase: 'error', difficulty:-1, category: 'error'};
    }
    return flashcard;
  }

/**
 * Deletes a Flashcard object from the db
 * @param id id of the Flashcard object we want to delete
 */
  async deleteFlashcard(id: number): Promise<void>{
    deleteDoc(doc(this.db, "flashcard", id.toString()));
  }
  
/**
 * 
 * @returns the next id number that is not taken and can be used when adding a new Flashcard object to the db
 */
  getNextAvailableId(): number{
    let res = -1;
    for(const flashcard of this.flashcards){
        if(flashcard.id > res){
          res = flashcard.id;
        }
    }
    return res+1;
  }

  /**
   * 
   * @param flashcard Flashcard object we add to the database
   */
  addFlashcard(flashcard: Flashcard): void{
    setDoc(doc(this.db, "flashcard",flashcard.id.toString()),flashcard);
  }

  
/**
 * Overrides the previous object value in the database
 * @param flashcard Flashcard object we want to edit
 */
  editFlashcard(flashcard: Flashcard): void{
    setDoc(doc(this.db, "flashcard",flashcard.id.toString()),flashcard);
  }
/**
 * 
 * @returns a Set of all categories at least one card has
 */
  async getAvailableCategories(): Promise<Set<string>>{
    
    await this.updateFlashcards();
    const res = new Set<string>();

    for(const flashcard of this.flashcards){
      res.add(flashcard.category);
    }
    return res;
  }
/**
 * 
 * @param category the category of the cards we want to get
 * @param study if true: all cards will be returned, if false (therefore inquiry mode): 10 random cards will be returned from the given category  
 * @returns an array of Flashcard objects based on the two criteria above
 */
  getFlashcardsByCategory(category: string, study: boolean): Flashcard[]{
    let res: Flashcard[] = [];

    for(const flashcard of this.flashcards){
      if(flashcard.category === category){
        res.push(flashcard);
      }
    }

    if(!study){
      const shuffled = res.sort(() => 0.5-Math.random());
      res = shuffled.slice(0, 10);
    }
     return res; 
  }
}
