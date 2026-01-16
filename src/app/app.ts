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
  ngOnInit() {
    console.log('le composant est chargé');
    const sauvegarde = localStorage.getItem('derniereMeteo');

    if (sauvegarde) this.resultatsmeteo = JSON.parse(sauvegarde);
    this.villeSaisie = this.resultatsmeteo.location.name;
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

          this.cdr.detectChanges();
        },
        error: (err) => {
          this.resultatsmeteo = null;
          this.cdr.detectChanges();
        },
      });
  }
}
