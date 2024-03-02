import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { City } from './city';
import { CityService } from './city.service';
import { GeocodingService } from './geocoding.service';
import { WORLD_MAP, COUNTRIES } from './country';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'traveltrackerapp';

  public zoom: number = WORLD_MAP.zoom;
  public center = WORLD_MAP.center;
  public selectCountry: string = WORLD_MAP.name;

  public cities: City[] = [];
  public countries: string[] = [];
  public editCity: City | null = null;
  public deleteCity: City | null = null;

  constructor(private cityService: CityService,
              private geocodingService: GeocodingService){}

  ngOnInit(): void {
    this.load();
  }

  public load(): void {
    this.loadCities();
    this.loadCountries();
  }

  private loadCities(): void {
    this.cityService.getCities().subscribe(
      (response: City[]) => {
        this.cities = response;
        this.cities.forEach((city, index) => {
          this.addMarker(city, index);
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    this.loadCountries();
  }

  private addMarker(city: City, index: number): void {
    // this.geocodingService.getCityData(city.name, city.country).subscribe(
    this.geocodingService.getCityDataFromLocal(city.name).subscribe(
      (data: any) => {
        // var latVal: number = data?.results[0].geometry?.location?.lat;
        // var lngVal: number = data?.results[0].geometry?.location?.lng;
        var latVal: number = data?.position?.lat;
        var lngVal: number = data?.position?.lng;
        this.cities[index] = {
          ...city,
          position: {
            lat: latVal,
            lng: lngVal
          }
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  private loadCountries(): void {
    this.cityService.getCountries().subscribe(
      (response: string[]) => {
        this.countries = response;
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
        this.load();
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
        this.load();
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
        this.load();
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
      this.load();
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

  public onSelectCountry(country: string) {
    const countryKey = country.toLowerCase().replace(' ', '');
    this.zoom = COUNTRIES[countryKey as keyof typeof COUNTRIES].zoom;
    this.center = COUNTRIES[countryKey as keyof typeof COUNTRIES].center;
    if (country === WORLD_MAP.name) {
      this.load();
    } else {
      this.cities = this.cities.filter(city => city.country === country);
    }
  }

}