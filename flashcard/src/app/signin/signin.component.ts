import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit{

  /**
   * The signed in user, if there isn't one, its a dummy user
   */
  user: User = {uid: '-1', displayName:'asd', email:'asd', highScore:-1, admin: false};

  /**
   * 
   * @param authService is used while the logging in process to get a user
   * @param userService is used to get user after the logging in process
   * @param cookieService is used to change to approptiate uid cookie after logging in/out
   * @param router is used to redirect user after logging in/out
   */
  constructor(public authService: AuthService, public userService: UserService, public cookieService: CookieService, private router: Router){}
  /**
   * Refreshes the user based on the uid cookie
   */
  ngOnInit(){
    this.userService.getUser(this.cookieService.get('uid')).then((user) =>{
      this.user = user;
    });
  }

  /**
   * Handles the signing in process (Google auth -> set cookie)
   * If the users was at the profile page, they are navigated away
   */
  login(){
    if(this.router.url.includes('profile')){
      this.router.navigate(['/']);
    }
    this.authService.GoogleAuth().then((user) =>{
      this.cookieService.set('uid', user.uid.toString());
      this.user = user;
    }) 
  }

  /**
   * Handles the logout process (Google auth logout -> setting user to dummy -> deleting uid cookie -> alert -> refresh)
   */
  logout(){
    this.authService.signOut();
    this.user = {uid: '-1', displayName:'asd', email:'asd', highScore:-1, admin: false};
    this.cookieService.delete('uid');
    this.router.navigate(['/']);
    alert("You have logged out successfully!");
  }
}
