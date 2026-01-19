import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeoDepartement, GeoRegion, GeoVille } from '../../models/weather.models';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './search.component.html',
})
export class SearchComponent {
    @Input() regions: GeoRegion[] = [];
    @Input() departements: GeoDepartement[] = [];
    @Input() villes: GeoVille[] = [];

    @Output() regionSelected = new EventEmitter<string>();
    @Output() departementSelected = new EventEmitter<string>();
    @Output() villeSelected = new EventEmitter<string>();
    @Output() search = new EventEmitter<string>();

    // Variables du formulaire
    selectedRegion = '';
    selectedDepartement = '';
    selectedVille = '';
    villeManuelle = '';

    onRegionChange() {
        this.selectedDepartement = '';
        this.selectedVille = '';
        this.regionSelected.emit(this.selectedRegion);
    }

    onDepartementChange() {
        this.selectedVille = '';
        this.departementSelected.emit(this.selectedDepartement);
    }

    onVilleListChange() {

        this.villeManuelle = this.selectedVille;
        this.villeSelected.emit(this.selectedVille);
    }

    rechercherManuellement() {
        if (this.villeManuelle) {
            this.search.emit(this.villeManuelle);
        }
    }
}
