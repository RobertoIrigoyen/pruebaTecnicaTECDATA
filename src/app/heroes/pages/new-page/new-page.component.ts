import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.scss'
})
export class NewPageComponent implements OnInit {


  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', Validators.required),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl('', Validators.required),
    first_appearance: new FormControl('', Validators.required),
    characters: new FormControl('', Validators.required),
    img: new FormControl(''),
  })

  public publishers = [
    {
      id: 'DC Comics', desc: 'DC - comics'
    },
    {
      id: 'Marvel Comics', desc: 'Marvel - comics'
    }
  ];

  constructor(private heroesService: HeroesService, private router: Router, private activateRoute: ActivatedRoute, private snackBar: MatSnackBar, private matDialog: MatDialog) {

  }
  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    //Convertir el input en mayusculas cuando se recoge el valor para editar
    this.heroForm.controls['superhero']!.valueChanges.subscribe((value: string | null) => {
      this.heroForm.patchValue({
        superhero: value?.toUpperCase()
      }, { emitEvent: false });
    });

    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById(id)),
      ).subscribe(hero => {
        if (!hero) return this.router.navigateByUrl('/');

        this.heroForm.reset(hero)

        return;
      })
  }
  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onInputSuperHeroe(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.toUpperCase();
    input.value = value;
    this.heroForm.patchValue({ superhero: value });
  }

  onSubmit() {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    };

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero)
        .subscribe(hero => {
          this.router.navigate(['/heroes/list']);
          this.showSnackBar(`EL heroe ${hero.superhero} ha sido modificado`);
        },
          err => {
            this.showSnackBar(`Ha habido un error al modificar al heroe`);
          }
        );
      return;
    }

    this.heroesService.addHero(this.currentHero)
      .subscribe(hero => {
        this.router.navigate(['/heroes/list']);
        this.showSnackBar(`EL heroe ${hero.superhero} ha sido creado`);
      },
        err => {
          this.showSnackBar(`Ha habido un error al crear al heroe`);
        })
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000
    })
  }
  onDeleteHero() {
    if (!this.currentHero.id) throw Error('El id de heroe es requerido');

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.heroesService.deleteHeroById(this.currentHero.id)),
        filter((wasDelete: boolean) => wasDelete)
      )
      .subscribe(() => {
        this.router.navigate(['/heroes/list']);
        this.showSnackBar(`EL heroe ${this.currentHero.superhero} ha sido eliminado`);
      }, err => {
        this.showSnackBar(`Ha habido un error al eliminar al heroe`);
      }
      );
  }

}
