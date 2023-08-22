import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


interface UserResponseData {
  accessToken: string;
  user:{
    email: string;
    username: string;
    id: string;
  }
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(
    email: string,
    password: string
  ) {

    return this.http.post<UserResponseData>('https://json-server-app-707ded616226.herokuapp.com/login', {
      email: email,
      password: password
    }).pipe(catchError(errorRes => {
      let errorMessage = 'An unknown error occurred!';
      if (!errorRes) {
        return throwError(errorMessage);
      }
      errorMessage = errorRes.error.message
      return throwError(errorMessage);
    }), tap(resData => {

      console.log(resData);
      
      this.handleAuthenticaton(
        resData.user.id,
        resData.user.username,
        resData.user.email,
        resData.accessToken
      )
    }))

  }

  register(
    username: string,
    email: string,
    password: string,
  ) {
    return this.http.post<UserResponseData>('https://json-server-app-707ded616226.herokuapp.com/register', {
      username: username,
      email: email,
      password: password
    }).pipe(catchError
      (this.handleError), tap(resData => {
        console.log(resData,"data");
        
        this.handleAuthenticaton(
          resData.user.id,
          resData.user.username,
          resData.user.email,
          resData.accessToken
        )
      }))
  }

  logout() {
    this.user$$.next(undefined);

    this.router.navigate(['/auth/login']);
    localStorage.removeItem('userData')
  }

  aoutoLogin() {
    const userDataJSON: string | null = localStorage.getItem('userData');
    if (!userDataJSON) {
      return;
    }
    const userData: {
      id: string,
      username: string,
      email: string,
      accessToken: string
    } = JSON.parse(userDataJSON);
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.id,
      userData.username,
      userData.email,
      userData.accessToken,
    )

    if (loadedUser.accessToken) {
      this.user$$.next(loadedUser)
    }

  }

  private handleAuthenticaton(
    id: string,
    username: string,
    email: string,
    accessToken: string
  ) {
    const user = new User(
      id,
      username,
      email,
      accessToken
    );
    this.user$$.next(user)
    localStorage.setItem('userData', JSON.stringify(user))

  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (errorRes.error && errorRes.error.message) {
      errorMessage = errorRes.error.message;
    }
    return throwError(errorMessage);
  }

}


