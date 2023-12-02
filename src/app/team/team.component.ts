import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common'
import { FootballService } from '../service/footballservice.service';
import {fixtureDataType,fixureType} from '../../app/interface/teams';
import {HttpErrorResponse} from '@angular/common/http'

@Component({
  selector: 'app-team-result',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  
  teamResponse:fixtureDataType[]=[];

  constructor(private activateRoute:ActivatedRoute,private footballServices:FootballService,private location:Location) { }

  ngOnInit(): void {

    this.activateRoute.paramMap.subscribe(params => {
      
      const teamId:string|null = params.get('TeamId');
      if(teamId)
      {
        this.teamData(+teamId);
      }
     
    });
  }

  teamData(teamId:number) {

    const resultCount:number = 10;
    const chachedData:string|null = localStorage.getItem("cachedTeamData"+teamId);
    
    if(chachedData) {
      const res: fixureType = JSON.parse(chachedData);
      if(res != null && res.response != null)
      {
        this.teamResponse = res.response;
        localStorage.setItem("cachedFixtureData"+teamId, JSON.stringify(res));        
      }

    } else {

      this.footballServices.teamData(teamId,resultCount).subscribe(
        {
          next: (res: fixureType) => {
            
            if(res != null && res.response != null)
            {
              this.teamResponse = res.response;
              localStorage.setItem("cachedTeamData"+teamId, JSON.stringify(res));              
              this.teamResponse[0].goals.home
            }
          },
          error: (error:HttpErrorResponse) => {
            console.log(error);
          }
        }
      )

    }   
    
  }

  previousPage(){
    this.location.back();
  }

}
