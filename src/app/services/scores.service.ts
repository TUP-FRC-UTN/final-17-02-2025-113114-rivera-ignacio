import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostScore, Score } from '../interfaces';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {
  private http = inject(HttpClient);

  constructor() { }

  getScores(): Observable<Score[]>{
    return this.http.get<Score[]>(environment.apiScores);
  }

  getScoresOfPlayer(playerName: string): Observable<Score[]>{
    return this.http.get<Score[]>(environment.apiScores, {params: {playerName}});
  }

  postScore(score: PostScore): Observable<Score>{
    return this.http.post<Score>(environment.apiScores, score);
  }
}
