import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueComponent } from './league/league.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
 {path: '', redirectTo: 'league/England/39', pathMatch: 'full' },
 {path:'league/:selectedCountry/:selectedCountryId',component: LeagueComponent},
 {path:'teamresult/:selectedCountry/:TeamId',component: TeamComponent}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
