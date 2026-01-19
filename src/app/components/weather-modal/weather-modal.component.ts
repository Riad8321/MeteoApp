import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherResponse } from '../../models/weather.models';

@Component({
    selector: 'app-weather-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './weather-modal.component.html'
})
export class WeatherModalComponent {
    @Input() weather: WeatherResponse | null = null;
    @Output() close = new EventEmitter<void>();

    fermer() {
        this.close.emit();
    }
}
