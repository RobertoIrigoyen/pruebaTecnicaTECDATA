import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnInit {

  public heroesList: Hero[] = []

  constructor(private heroes: HeroesService){}
  ngOnInit(): void {
    this.heroes.getHeroes().subscribe(heroes => this.heroesList = heroes);
  }
}
