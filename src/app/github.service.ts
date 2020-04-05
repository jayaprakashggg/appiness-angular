import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  // API path
  base_path = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  // Get all github user data
  getAllGithubUsers(list) {
    return this.http
      .get(this.base_path + '/users?since=' + list)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get single github user data by username
  getSingleGithubUser(username) {
    return this.http.get(this.base_path + '/users/' + username);
  }

  // Get github user repositories by username
  getGithubUserRepo(username) {
    return this.http.get(this.base_path + '/users/' + username + '/repos');
  }
}
