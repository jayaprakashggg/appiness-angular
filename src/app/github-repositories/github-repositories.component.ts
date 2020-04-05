import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-github-repositories',
  templateUrl: './github-repositories.component.html',
  styleUrls: ['./github-repositories.component.scss'],
})
export class GithubRepositoriesComponent implements OnInit {
  repositories: any = null;
  isEmpty: Boolean = false;

  constructor(
    public route: ActivatedRoute,
    public githubService: GithubService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params['username']);
      this.getRepositories(params['username']);
    });
  }

  getRepositories(username) {
    this.githubService.getGithubUserRepo(username).subscribe((response) => {
      this.repositories = response;
      this.isEmpty = this.repositories.length > 0 ? false : true;
    });
  }
}
