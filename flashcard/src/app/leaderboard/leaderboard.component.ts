import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})

/**
 * Handles the leaderboard page
 */
export class LeaderboardComponent implements OnInit{
  /**
   * Top 10 users in an already sorted array
   */
  users: User[] = [];

  /**
   * 
   * @param userService is used to get the top 10 users
   * @param location is used to let the user go back a page via a back button
   */
  constructor(private userService: UserService, private location: Location) {}

  /**
   * Fetches the top 10 users
   */
  ngOnInit(){
    this.userService.getTopTenUsers().then((users) =>{
      this.users = users;
    });
  }

/**
 * Returns the user to the previous page
 */
  goBack(): void {
    this.location.back();
  }
}
