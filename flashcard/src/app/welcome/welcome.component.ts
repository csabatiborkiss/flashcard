import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

/**
 * Displays a greeting and some tips on the home page
 */
export class WelcomeComponent implements OnInit{

  /**
   * 
   * @param appComponent is used to set the navbar
   * @param navService is used to set the navbar
   */
  constructor(private appComponent: AppComponent, private navService: NavService){}

  /**
   * Resets activeSite to default
   */
  ngOnInit(){
    this.navService.setActiveSite(0);
    this.appComponent.ngOnInit();
  }
}
