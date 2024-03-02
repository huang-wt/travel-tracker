import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { City } from './city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiServerUrl}/city/all`);
  }

  public getCountries(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiServerUrl}/city/country`);
  }

  public addCity(city: City): Observable<City> {
    return this.http.post<City>(`${this.apiServerUrl}/city/add`, city);
  }

  public updateCity(city: City): Observable<City> {
    return this.http.put<City>(`${this.apiServerUrl}/city/update`, city);
  }

  public deleteCity(cityId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/city/delete/${cityId}`);
  }
}
