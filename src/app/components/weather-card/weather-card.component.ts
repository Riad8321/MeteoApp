import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherResponse } from '../../models/weather.models';

@Component({
    selector: 'app-weather-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './weather-card.component.html',
})
export class WeatherCardComponent {
    @Input() weatherData: WeatherResponse | null = null;

    @Output() addToFavorites = new EventEmitter<void>();
    @Output() showDetails = new EventEmitter<WeatherResponse>();

    voirDetails() {
        if (this.weatherData) {
            this.showDetails.emit(this.weatherData);
        }
    }

    clicFavoris() {
        this.addToFavorites.emit();
    }
}
