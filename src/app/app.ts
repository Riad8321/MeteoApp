import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { WeatherModalComponent } from './components/weather-modal/weather-modal.component';
import { WeatherService } from './services/weather.service';
import { FavoriteItem, GeoDepartement, GeoRegion, GeoVille, WeatherResponse } from './models/weather.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    SearchComponent,
    WeatherCardComponent,
    FavoritesListComponent,
    WeatherModalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  title = 'MeteoApp';

  weatherData: WeatherResponse | null = null;

  // Modal State
  selectedWeatherForModal: WeatherResponse | null = null;

  regions: GeoRegion[] = [];
  departements: GeoDepartement[] = [];
  villes: GeoVille[] = [];

  favorites: FavoriteItem[] = [];
  sortAsc = true;


  constructor(private weatherService: WeatherService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.chargerDonnees();
  }

  chargerDonnees() {
    const lastWeather = localStorage.getItem('derniereMeteo');
    if (lastWeather) {
      this.weatherData = JSON.parse(lastWeather);
    }

    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites);
    }

    this.weatherService.getRegions().subscribe((data) => {
      this.regions = data;
      this.cdr.detectChanges();
    });
  }

  // --- Modal Logic ---
  ouvrirModal(meteo: WeatherResponse) {
    this.selectedWeatherForModal = meteo;
    this.cdr.detectChanges();
  }

  fermerModal() {
    this.selectedWeatherForModal = null;
    this.cdr.detectChanges();
  }

  //--- Fonctions de Recherche ---

  lancerRecherche(ville: string) {
    this.weatherService.getWeather(ville).subscribe({
      next: (resultat) => {
        this.weatherData = resultat;
        localStorage.setItem('derniereMeteo', JSON.stringify(resultat));
        this.cdr.detectChanges();
      },
      error: (erreur) => {
        console.error('Erreur météo:', erreur);
        this.weatherData = null;
        alert("Impossible de trouver la météo pour cette ville !");
        this.cdr.detectChanges();
      },
    });
  }

  quandRegionChange(codeRegion: string) {
    this.departements = [];
    this.villes = [];

    if (codeRegion) {
      this.weatherService.getDepartementsByRegion(codeRegion).subscribe((data) => {
        this.departements = data;
        this.cdr.detectChanges();
      });
    }
  }

  quandDepartementChange(codeDep: string) {
    this.villes = [];

    if (codeDep) {
      this.weatherService.getVillesByDepartement(codeDep).subscribe((data) => {
        this.villes = data;
        this.cdr.detectChanges();
      });
    }
  }

  // --- Fonctions Favoris ---

  ajouterAuxFavoris() {
    if (!this.weatherData) return;

    if (this.favorites.length >= 5) {
      alert('Tu as déjà 5 favoris, supprime-en un !');
      return;
    }

    const existeDeja = this.favorites.some(
      (fav) => fav.data.location.name === this.weatherData!.location.name
    );

    if (!existeDeja) {
      this.favorites.push({
        data: this.weatherData,
        showDetails: false
      });
      this.sauvegarderFavoris();
    } else {
      alert("Cette ville est déjà dans tes favoris !");
    }
  }

  voirFavori(fav: FavoriteItem) {
    this.weatherData = fav.data;
    localStorage.setItem('derniereMeteo', JSON.stringify(this.weatherData));
  }

  supprimerFavori(index: number) {
    this.favorites.splice(index, 1);
    this.sauvegarderFavoris();
  }

  trierFavoris() {
    this.favorites.sort((a, b) => {
      const nomA = a.data.location.name.toLowerCase();
      const nomB = b.data.location.name.toLowerCase();

      if (this.sortAsc) {
        return nomA.localeCompare(nomB);
      } else {
        return nomB.localeCompare(nomA);
      }
    });

    this.sortAsc = !this.sortAsc;
    this.sauvegarderFavoris();
  }

  sauvegarderFavoris() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
