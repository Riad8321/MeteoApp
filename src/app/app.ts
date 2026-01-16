import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Middleware } from './middleware';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  villeSaisie: string = '';
  resultatsmeteo: any = null;

  isLoading: boolean = false;

  regions: any[] = [];
  departements: any[] = [];
  villes: any[] = [];

  regionSelectionnee: string = '';
  departementSelectionne: string = '';
  villeSelectionnee: string = '';

  afficherDetails: boolean = false;
  favorites: any[] = [];

  sortAsc: boolean = true;

  ngOnInit() {
    console.log('le composant est chargé');

    const sauvegarde = localStorage.getItem('derniereMeteo');

    if (sauvegarde) {
      this.resultatsmeteo = JSON.parse(sauvegarde);
      this.villeSaisie = this.resultatsmeteo.location.name;
    }

    this.service.getRegions().subscribe((data) => {
      this.regions = data;
    });
    const favorisSauvegardes = localStorage.getItem('favorites');
    if (favorisSauvegardes) {
      this.favorites = JSON.parse(favorisSauvegardes);
    }
  }

  protected readonly title = signal('MeteoApp');
  constructor(private service: Middleware, private cdr: ChangeDetectorRef) {}

  recherchemeteo() {
    if (this.villeSaisie !== '')
      this.service.getmeteo(this.villeSaisie).subscribe({
        next: (donnees) => {
          this.resultatsmeteo = donnees;
          console.log(donnees);
          localStorage.setItem('derniereMeteo', JSON.stringify(donnees));
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.resultatsmeteo = null;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
      });
  }
  onRegionChange() {
    this.departements = [];
    this.villes = [];
    this.departementSelectionne = '';
    this.villeSelectionnee = '';

    this.service.getDepartementsByRegion(this.regionSelectionnee).subscribe((data) => {
      this.departements = data;
      this.cdr.detectChanges();
    });
  }

  onDepartementChange() {
    this.villes = [];
    this.villeSelectionnee = '';

    this.service.getVillesByDepartement(this.departementSelectionne).subscribe((data) => {
      this.villes = data;
      this.cdr.detectChanges();
    });
  }

  onVilleChange() {
    this.villeSaisie = this.villeSelectionnee;
    this.cdr.detectChanges();
  }
  deplierDetails() {
    this.afficherDetails = !this.afficherDetails;
    this.cdr.detectChanges();
  }
  addToFavorites() {
    if (!this.resultatsmeteo) return;

    const existeDeja = this.favorites.some(
      (fav) => fav.data.location.name === this.resultatsmeteo.location.name
    );

    if (!existeDeja) {
      this.favorites.push({
        data: this.resultatsmeteo,
        showDetails: false,
      });

      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }

  selectFavorite(fav: any) {
    this.resultatsmeteo = fav.data;
    this.villeSaisie = fav.data.location.name;
  }

  toggleFavoriteDetails(index: number) {
    this.favorites[index].showDetails = !this.favorites[index].showDetails;
  }
  removeFromFavorites(index: number) {
    this.favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  sortFavorites() {
    this.favorites.sort((a, b) => {
      const nameA = a.data.location.name.toLowerCase();
      const nameB = b.data.location.name.toLowerCase();

      if (this.sortAsc) {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    this.sortAsc = !this.sortAsc;

    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
