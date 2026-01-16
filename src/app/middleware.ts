import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Middleware {
  meteo: string = '';
  constructor(private Http: HttpClient) {}
  getmeteo(villeSaisie: String): Observable<any> {
    return this.Http.get(
      `https://api.weatherapi.com/v1/current.json?key=34df2681f71740eab6d142515261501&q=${villeSaisie}&aqi=no`
    );
  }
}
