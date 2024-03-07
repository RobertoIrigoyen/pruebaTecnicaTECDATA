import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/heroes.interface';
import { delay } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnInit {

  public heroesList: Hero[] = []
  public noHero: boolean = false;
  public loading: boolean = true
  constructor(private heroes: HeroesService) { }
  ngOnInit(): void {
    this.heroes.getHeroes()
      .pipe(
        delay(1500)
      )
      .subscribe(heroes => {
        if (!heroes) {
          this.noHero = true;
        }
        this.loading = false;
        this.heroesList = heroes;
      });
  }
}
