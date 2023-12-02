import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FootballService } from '../service/footballservice.service';
import { HttpErrorResponse } from '@angular/common/http';
import {ResponseType ,ResponseDataType } from '../interface/league';



@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  constructor(private router: Router,private activatedRoute: ActivatedRoute,
    private footballServices:FootballService) { }
    


countryData:ResponseDataType[]=[];
responseType:ResponseType[]=[];

selectedCountry:string | null = "England";
selectedCountryId:number | undefined;

public countries:{countryName:string,leagueName:string,leagueId:number}[]=[];

  ngOnInit(): void {
     
  this.activatedRoute.paramMap.subscribe(params => {
    
    const countryId = Number(params.get('selectedCountryId'));;
    this.selectedCountry = params.get('selectedCountry');
  
    if(countryId) {
      this.countryResult(countryId);
    }
  });
  

}

teamResult(TeamId:number){
  
  this.router.navigate(['teamresult',this.selectedCountry,TeamId]);
}

countryResult(countryId:number){
  
  this.selectedCountryId=countryId ;

  if(countryId)
    {
      const chachedData:string|null = localStorage.getItem("cachedStandingData" + countryId);
      if(chachedData)
      {
        const data: ResponseType= JSON.parse(chachedData);
        this.countryData = data.response[0].league.standings[0];
      }else {


        this.footballServices.getFootballData(countryId).subscribe(
          {
            next: (res: ResponseType) => {
              if(res != undefined && res.response != undefined && res.response.length != 0)
              {
                this.countryData = res.response[0].league.standings[0];
                localStorage.setItem("cachedStandingData" + countryId, JSON.stringify(res));
              }
            },
            error: (error:HttpErrorResponse) => {
              console.log(error);
            }
          }
        )
      }
    }
  


}




}