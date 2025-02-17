import { Component, inject } from '@angular/core';
import { ScoresService } from '../../services/scores.service';
import { Score, User } from '../../interfaces';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.css'
})
export class ScoresComponent {
  private scoresService = inject(ScoresService);

  user: User = JSON.parse(localStorage.getItem('currentUser')!);
  scores: Score[] = []

  constructor(){
    if(this.user.role == 'admin'){
      this.scoresService.getScores().subscribe({
        next: (matches: Score[]) => {
          this.scores = matches;
        }
      })
    }else{
      this.scoresService.getScoresOfPlayer(this.user.username).subscribe({
        next: (matches: Score[]) => {
          this.scores = matches;
        }
      })
    }
  }

}
