import { Component, OnInit} from '@angular/core';
import { NavService } from './services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Flashcards';
  activeSite = 0;

  /**
   * 
   * @param navService is used to set active site on navbar
   */
  constructor(private navService: NavService){}

  /**
   * Sets active site on navbar
   */
  ngOnInit(){
    this.activeSite = this.navService.getActiveSite();
  }
}
