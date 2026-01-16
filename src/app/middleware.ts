import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Middleware {
  constructor(private http: HttpClient) {}

  getmeteo(villeSaisie: string): Observable<any> {
    return this.http.get(
      `https://api.weatherapi.com/v1/current.json?key=${environment.weatherApiKey}&q=${villeSaisie}&aqi=no`
    );
  }

  getRegions(): Observable<any> {
    return this.http.get(`https://geo.api.gouv.fr/regions`);
  }

  getDepartementsByRegion(codeRegion: string): Observable<any> {
    return this.http.get(`https://geo.api.gouv.fr/regions/${codeRegion}/departements`);
  }

  getVillesByDepartement(codeDepartement: string): Observable<any> {
    return this.http.get(`https://geo.api.gouv.fr/departements/${codeDepartement}/communes`);
  }
}
