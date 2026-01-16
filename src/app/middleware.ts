import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Middleware {
  meteo: string = '';
  constructor(private Http: HttpClient) {}
  getmeteo(villeSaisie: String): Observable<any> {
    return this.Http.get(
      `https://api.weatherapi.com/v1/current.json?key=${environment.weatherApiKey}&q=${villeSaisie}&aqi=no`
    );
  }
}
