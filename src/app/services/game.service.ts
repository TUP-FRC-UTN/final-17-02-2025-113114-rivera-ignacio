import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Word } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private http = inject(HttpClient);

  constructor() {}

  getWords(): Observable<Word[]>{
    return this.http.get<Word[]>(environment.apiGame);
  }
}
