import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GithubUsersComponent } from './github-users/github-users.component';
import { GithubRepositoriesComponent } from './github-repositories/github-repositories.component';

const appRoutes: Routes = [
  {
    path: '',
    component: GithubUsersComponent,
  },
  {
    path: 'repositories/:username',
    component: GithubRepositoriesComponent,
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
