import { Component, Input } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-card-heroes',
  templateUrl: './card-heroes.component.html',
  styleUrl: './card-heroes.component.scss'
})
export class CardHeroesComponent {

  @Input()
  public hero!: Hero;
}
