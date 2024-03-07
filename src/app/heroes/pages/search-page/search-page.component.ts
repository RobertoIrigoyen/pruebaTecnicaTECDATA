import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {

  public searchInput = new FormControl('');

  public heroes: Hero[] = [];
  public selectedHero?: Hero;
  constructor(private heroesService: HeroesService, private router: Router) { }

  searchHero() {
    const value: string = this.searchInput.value || '';

    this.heroesService.getSuggestions(value)
      .subscribe(heroes => this.heroes = heroes)
  }
  
  onSelectedOption(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {

      this.selectedHero = undefined
      return;
    }

    const hero: Hero = event.option.value;

    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
    this.heroesService.getHeroById(hero.id!)
      .subscribe(() => {
        this.router.navigate(['/heroes', this.selectedHero?.id])
      });
  }

}
