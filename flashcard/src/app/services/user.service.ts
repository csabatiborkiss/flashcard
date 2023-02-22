import { Injectable } from '@angular/core';
import { doc, setDoc, getDoc, collection, query, getDocs } from "firebase/firestore"; 
import { User } from '../interfaces/user';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
/**
 * Handles direct database interaction regarding the users
 */
export class UserService {

  /**
   * Firebase instance
   */
  app = initializeApp(environment.firebase);
  /**
   * Firestore db instance
   */
  db = getFirestore(this.app);
/**
 * 
 * @param uid the uid of the user we want to access
 * @returns the User object with the provided uid
 */
  async getUser(uid: string): Promise<User>{
    const docRef = doc(this.db, 'user', uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    let user: User;
    if(data === undefined){
      user = {uid: '-1', displayName: 'asd', email: 'asd', highScore: -1, admin: false};
    } else{
      user = {uid: data['uid'], displayName: data['displayName'], email: data['email'], highScore: data['highScore'], admin: data['admin']};
    }
    return user;
  }

  /**
   * Adds (or overrides) a user in the db
   * @param user User object we want to add
   */
  async addUser(user: User): Promise<User>{
    setDoc(doc(this.db, "user",user.uid.toString()),user);
    return user;
  }

  /**
   * Updates the highscore of the given user to the given number in the database
   * @param user the User whose highscore we want to change
   * @param highScore the number we want to set the highscore
   */
  updateHighScore(user: User, highScore: number){
    user.highScore = highScore;
    this.addUser(user);
  }

  /**
   * 
   * @returns the users in an array with all their data from the database
   */
  async getUsers() : Promise<User[]>{
    const users: User[] = [];

    const q = query(collection(this.db, "user"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
  
      const uid: string = doc.data()['uid'];
      const email: string = doc.data()['email'];
      const admin: boolean = doc.data()['admin']
      const displayName: string = doc.data()['displayName'];
      const highScore = Number(doc.data()['highScore']);

      const user: User = {uid: uid, admin: admin, email: email, displayName: displayName, highScore: highScore};
      users.push(user);
    });
    
    return users;
  }

  /**
   * 
   * @returns the top 10 users based on their high scores sorted descending by high score in an array
   */
  async getTopTenUsers(): Promise<User[]>{
    const users: User[] = await this.getUsers();
    users.sort((a,b) => (a.highScore > b.highScore) ? -1 : 1);
    return users;
  }
}
