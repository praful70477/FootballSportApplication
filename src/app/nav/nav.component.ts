import { Component, OnInit } from '@angular/core';
import { FootballService} from '../service/footballservice.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public footballServices:FootballService,public router:Router) { }

    public countries:{countryName:string,leagueName:string,leagueId:number}[]=[];
    
    selectedCountry:string="England"; 
    selectedCountryId:number|undefined; 
      
      

  ngOnInit(): void {

    this.countries = this.footballServices.Countries;
    
  }
}
