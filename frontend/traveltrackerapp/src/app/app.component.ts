import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { City } from './city';
import { CityService } from './city.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'traveltrackerapp';

  public cities: City[] = [];

  constructor(private cityService: CityService){}

  ngOnInit(): void {
    this.getCities();
  }

  public getCities(): void {
    this.cityService.getCities().subscribe(
      (response: City[]) => {
        this.cities = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}