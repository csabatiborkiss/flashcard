import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../app.component';
import { User } from '../interfaces/user';
import { NavService } from '../services/nav.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

/**
 * Handles the display of a user's profile and the functions available from there
 */
export class ProfileComponent {

  /**
   * The logged in user whose profile we display
   */
  user: User = {uid: '-1', displayName:'asd', email:'asd', highScore:-1, admin: false};
  /**
   * 
   * @param cookieService is used to get the logged in user via a uid cookie
   * @param userService is used to get the user's data from the database via its uid
   * @param navService is used to set the navbar
   * @param appComponent is used to set the navbar
   */
  constructor(private cookieService: CookieService, private userService: UserService, private navService: NavService, private appComponent: AppComponent){}

  /**
   * Refreshes the class member user, and sets the navbar
   */
  ngOnInit(){
    this.navService.setActiveSite(3);
    this.appComponent.ngOnInit();
    this.userService.getUser(this.cookieService.get('uid')).then((user) =>{
      this.user = user;
    });
  }
}
