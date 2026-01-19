import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GeoDepartement, GeoRegion, GeoVille, WeatherResponse } from '../models/weather.models';

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    constructor(private http: HttpClient) { }

    getWeather(city: string): Observable<WeatherResponse> {
        return this.http.get<WeatherResponse>(
            `https://api.weatherapi.com/v1/current.json?key=${environment.weatherApiKey}&q=${city}&aqi=no`
        );
    }

    getRegions(): Observable<GeoRegion[]> {
        return this.http.get<GeoRegion[]>(`https://geo.api.gouv.fr/regions`);
    }

    getDepartementsByRegion(codeRegion: string): Observable<GeoDepartement[]> {
        return this.http.get<GeoDepartement[]>(
            `https://geo.api.gouv.fr/regions/${codeRegion}/departements`
        );
    }

    getVillesByDepartement(codeDepartement: string): Observable<GeoVille[]> {
        return this.http.get<GeoVille[]>(
            `https://geo.api.gouv.fr/departements/${codeDepartement}/communes`
        );
    }
}
