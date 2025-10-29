import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // מערך קבוע של משתמשים
  private users: User[] = [
    { id: 1, name: 'Yaniv Levi' },
    { id: 2, name: 'Danny Go' },
    { id: 3, name: 'Tal Shir' }
  ];

  //  שמור את המשתמש ה'מחובר' הנוכחי
  private _currentUser = new BehaviorSubject<User | null>(this.users[0]);
  public currentUser$: Observable<User | null> = this._currentUser.asObservable();

  
  public get currentUser(): User | null {
    return this._currentUser.getValue();
  }

 
  loginAs(userId: number): void {
    const user = this.users.find(u => u.id === userId) || null;
    this._currentUser.next(user);
    if (user) {
      console.log(`User logged in: ${user.name}`);
    }
  }

  getAllUsers(): User[] {
    return this.users;
  }
}
