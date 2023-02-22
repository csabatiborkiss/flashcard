import { Injectable } from '@angular/core';
import { GoogleAuthProvider, getAuth, signOut } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { User } from '../interfaces/user';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root',
})
/**
 * AuthService handles Google authentication (logging in and out) and the database operations right after signing in
 */
export class AuthService {
  /**
   * 
   * @param afAuth instance used to access Google authentication
   * @param userService used to handle database operations
   */
  constructor(public afAuth: AngularFireAuth, private userService: UserService) {}
 
  /**
   * 
   * @returns a user after they used the Google login popup
   */
  async GoogleAuth(): Promise<User> {
    return await this.AuthLogin(new GoogleAuthProvider());
  }
 /**
  * 
  * @param provider 
  * @returns a valid user if there aren't any errors, or a dummy user if there were errors
  */
  async AuthLogin(provider: firebase.auth.AuthProvider | GoogleAuthProvider): Promise<User> {
    return this.afAuth
      .signInWithPopup(provider)
      .then(async (result) => {

        if(result.user === null || result.user.email === null || result.user.displayName === null){
          return {uid: "-1", admin: false, highScore: -1, email:"asd", displayName: "asd"};
        }
        const users: User[] = await this.userService.getUsers();
        const uidCheck: string = result.user.uid;

        for(const user of users){
          if(uidCheck == user.uid){
            return user;
          }
        }
        const newUser: User = {uid: result.user.uid, admin: false, highScore: 0, email: result.user.email, displayName: result.user.displayName};

        this.userService.addUser(newUser).then((user)=>{
          return user;
        });
        return newUser;
      })
      .catch(() => {
        const user: User = {uid: "-1", displayName: "asd", email: "asd", highScore: -1, admin: false };
        return user
      });
  }
/**
 * Signs out the authenticated user
 */
  signOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
     return true;
    }).catch(() => {
      return false;
    });
  }
}