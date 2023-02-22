import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * Stores the currently active site, and handles its getter and setter
 */
export class NavService {

  /**
   * Currently active site: 0 - default, 1 - study, 2 - inquiry, 3 - profile
   */
  activeSite = 0;

  /**
   * Setter for activeSite
   * @param site 
   */
  setActiveSite(site: number){
    this.activeSite = site;
  }

  /**
   * Getter for activeSite
   * @returns activeSite value
   */
  getActiveSite(){
    return this.activeSite;
  }
}
