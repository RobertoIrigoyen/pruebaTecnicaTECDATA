import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/heroes.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {
  transform(hero: Hero): string {
    if (!hero.img) {
      return 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
    }

    return hero.img;
    

  }

}
