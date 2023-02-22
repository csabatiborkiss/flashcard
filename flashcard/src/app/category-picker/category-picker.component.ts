import { Component } from '@angular/core';
import { FlashcardService } from '../services/flashcard.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from '../services/nav.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-category-picker',
  templateUrl: './category-picker.component.html',
  styleUrls: ['./category-picker.component.scss']
})
/**
 * Lets the user choose from the available categories before using either study or inquiry mode
 */
export class CategoryPickerComponent implements OnInit{

  /**
   * All the categories with at least 1 flashcard stored in a Set
   */
  categories = new Set<string>();
  /**
   * the value of urlType can be 'study' or 'inquiry' based on the url of the route the user has clicked 
   */
  urlType = "";

  /**
   * 
   * @param flashcardService is used to get the available categories based on the flashcards in the db
   * @param router is used to identify the url and make the routing easier after the user has picked a category
   * @param navService is used to set the navbar
   * @param appComponent is used to set the navbar
   */
  constructor(private flashcardService: FlashcardService, private router: Router , private navService: NavService, private appComponent: AppComponent){}

  /**
   * fetches the categories, sets the navbar
   */
  ngOnInit(){
    if(this.router.url.includes('study')){
      this.navService.setActiveSite(1);
      this.urlType = 'study';
    } else{
      this.navService.setActiveSite(2);
      this.urlType = 'inquiry';
    }
    this.appComponent.ngOnInit();
    this.flashcardService.getAvailableCategories().then((categories) =>{
      this.categories = categories;
    });
  }
}
