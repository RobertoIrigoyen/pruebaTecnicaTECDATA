import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl = environment.baseUrl;





  constructor(private http: HttpClient) {

  }

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  public getHeroById(id: string): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`).pipe(catchError(error => of(undefined)))
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&limit=6`);
  }
  
}
