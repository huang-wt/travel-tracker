import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { City } from './city';
import { CityService } from './city.service';
import { GeocodingService } from './geocoding.service';
import { WORLD_MAP, COUNTRIES } from './country';
import { map, Observable } from 'rxjs';

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

  public cities$: Observable<City[]> | undefined = undefined;
  public countries$: Observable<string[]> | undefined = undefined;
  public editCity: City | null = null;
  public deleteCity: City | null = null;

  constructor(private cityService: CityService,
              private geocodingService: GeocodingService){}

  ngOnInit(): void {
    this.load();
  }

  public load(): void {
    this.cities$ = this.loadCities();
    this.countries$ = this.cityService.getCountries();
  }

  private loadCities(): Observable<City[]> {
    return this.cityService.getCities().pipe(
      map((cities: City[]) => {
        cities.forEach((city, index) => {
          cities[index] = {
            ...city,
            position$: this.getMarker(city.name)
          }
        });
        return cities;
      })
    );
  }

  private getMarker(city: string): Observable<any> {
    // return this.geocodingService.getCityData(city.name, city.country).subscribe(
    return this.geocodingService.getCityDataFromLocal(city).pipe(
      map(data => {
        return {
          // lat: Number(data?.results[0].geometry?.location?.lat),
          // lng: Number(data?.results[0].geometry?.location?.lng)
          lat: Number(data?.position?.lat),
          lng: Number(data?.position?.lng)
        }
      })
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
    this.cities$ = this.cities$?.pipe(
      map((cities: City[]) => {
        return cities.filter(city => 
          city.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || city.country.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || city.visitedYear.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || city.review.toLowerCase().indexOf(key.toLowerCase()) !== -1);
      })
    );

    if (!key) {
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
      this.cities$ = this.cities$?.pipe(
        map((cities: City[]) => {
          return cities.filter(city => city.country === country);
        })
      );
    }
  }

}