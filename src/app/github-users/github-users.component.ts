import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-github-users',
  templateUrl: './github-users.component.html',
  styleUrls: ['./github-users.component.scss'],
})
export class GithubUsersComponent implements OnInit {
  users: any = null;
  searchUser: any = null;
  username: String = '';
  errorMessage: Boolean = false;
  previousList: any = [];
  nextList: Number = 0;
  isPrevious: Boolean = false;

  constructor(public githubService: GithubService) {}

  ngOnInit() {
    this.getAllStudents(this.nextList);
  }

  getAllStudents(list) {
    this.isPrevious
      ? null
      : this.users
      ? this.previousList.push(this.users[0].id - 1)
      : null;
    this.githubService.getAllGithubUsers(list).subscribe((response) => {
      window.scroll(0, 0);
      this.users = response;
      if (this.users.length > 0) {
        this.nextList = this.users[this.users.length - 1].id;
      }
    });
  }

  onClickPrevious() {
    this.isPrevious = true;
    this.getAllStudents(this.previousList[this.previousList.length - 1]);
    this.previousList.pop();
    console.log(this.previousList);
  }

  onClickNext() {
    this.isPrevious = false;
    this.getAllStudents(this.nextList);
  }

  onClickSearch() {
    this.errorMessage = false;
    this.username
      ? this.githubService.getSingleGithubUser(this.username).subscribe(
          (response) => {
            this.searchUser = response;
          },
          (error) => {
            this.errorMessage = true;
          }
        )
      : (this.errorMessage = true);
  }
}
