import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  public editCity: City | null = null;
  public deleteCity: City | null = null;

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

  public onAddCity(addForm: NgForm): void {
    document.getElementById('add-city-form')?.click();
    this.cityService.addCity(addForm.value).subscribe(
      (response: City) => {
        console.log(response);
        this.getCities();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCity(city: City): void {
    this.cityService.updateCity(city).subscribe(
      (response: City) => {
        console.log(response);
        this.getCities();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCity(cityId: number): void {
    this.cityService.deleteCity(cityId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCities();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchCities(key: string): void {
    const results: City[] = [];
    for (const city of this.cities) {
      if (city.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || city.country.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || city.visitedYear.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || city.review.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(city);
      }
    }

    this.cities = results;
    if (results.length === 0 || !key) {
      this.getCities();
    }
  }

  public onOpenModal(city: City | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addCityModal');
    } else if (mode === 'edit') {
      this.editCity = city;
      button.setAttribute('data-target', '#updateCityModal');
    } else if (mode === 'delete') {
      this.deleteCity = city;
      button.setAttribute('data-target', '#deleteCityModal');
    }

    container?.appendChild(button);
    button.click();
  }

}