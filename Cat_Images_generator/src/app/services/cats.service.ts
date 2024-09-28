import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Breed } from '../models/breed.interface';
import { Cat } from '../models/cat.interface';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  private headers = new HttpHeaders({
    'x-api-key': environment.apiCatsKey
  });
  private url = 'https://api.thecatapi.com/v1/';

  constructor(private http: HttpClient) { }

  getBreeds(): Observable<Breed[]> {
    const headers = this.headers;
    return this.http.get<Breed[]>(`${this.url}breeds/`, { headers });
  }

  getAllCats(limit: number): Observable<Cat[]> {
    const headers = this.headers;
    let query_params = {
      limit: limit,
      has_breeds: 1
    }
    return this.http.get<Cat[]>(`${this.url}images/search`, {headers, params: query_params});
  }

  getCatsByBreeds(limit: number, selectedBreeds: string[]): Observable<Cat[]> {
    const headers = this.headers;
    let query_params = {
      limit: limit,
      has_breeds: 1,
      breed_ids: selectedBreeds.join()
    }
    return this.http.get<Cat[]>(`${this.url}images/search`, {headers, params: query_params});
  }
}
