import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteItem, WeatherResponse } from '../../models/weather.models';

@Component({
    selector: 'app-favorites-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './favorites-list.component.html',
})
export class FavoritesListComponent {
    @Input() favorites: FavoriteItem[] = [];
    @Input() sortAsc = true;

    @Output() selectFavorite = new EventEmitter<FavoriteItem>();
    @Output() removeFavorite = new EventEmitter<number>();
    @Output() sort = new EventEmitter<void>();
    @Output() showDetails = new EventEmitter<WeatherResponse>();

    choisirFavori(fav: FavoriteItem) {
        this.selectFavorite.emit(fav);
    }

    supprimer(index: number, event: Event) {
        event.stopPropagation();
        this.removeFavorite.emit(index);
    }

    trier() {
        this.sort.emit();
    }

    voirDetails(fav: FavoriteItem, event: Event) {
        event.stopPropagation();
        this.showDetails.emit(fav.data);
    }
}
