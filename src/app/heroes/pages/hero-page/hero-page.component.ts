import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.scss'
})
export class HeroPageComponent implements OnInit {
  public heroInfo?: Hero;
  public noHero:boolean = false
  constructor(private heroesService: HeroesService, private activateRoute: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        delay(3000),
        switchMap(({ id }) => this.heroesService.getHeroById(id))
      )
      .subscribe(hero => {
        if (!hero) {
          this.noHero = true;
        }
        this.heroInfo = hero;
      })
  }
  goBack() {
    this.router.navigateByUrl('/heroes/list')
  }


}
