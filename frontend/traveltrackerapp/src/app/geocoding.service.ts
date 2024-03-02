import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private http: HttpClient) { }

  public getCityDataFromLocal(city: string): Observable<any> {
    return this.http.get<any>(`/assets/sample_location/${city.toLowerCase()}.json`);
  }

  public getCityData(city: string, country: string): Observable<any> {
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}, ${country}&key=`);
  }
}
