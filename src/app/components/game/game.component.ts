import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { PostScore, Score, User, Word } from '../../interfaces';
import { ScoresService } from '../../services/scores.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  private gameService = inject(GameService);
  private scoreService = inject(ScoresService);

  player: User = JSON.parse(localStorage.getItem('currentUser')!);
  letters: string = 'abcdefghijklmnopqrstuvwxyz';
  word: Word | null = null;
  guessed: string = '';
  notguessed: string = '';
  points: number = 100;
  matches: number = 0;

  constructor(){
    this.start();
  }

  start(){
    this.word = null;
    this.guessed = '';
    this.notguessed = '';
    this.points = 100;
    this.gameService.getWords().subscribe({
      next: (words: Word[]) => {
        const randomIndex = Math.floor(Math.random() * (words.length - 0) + 0);;
        this.word = words[randomIndex];        
      },
      error: () => {
        alert("Error al obtener palabras...")
      }
    });
    this.scoreService.getScoresOfPlayer(this.player.username).subscribe({
      next: (scores: Score[]) => {
        this.matches = scores.length;
      },
      error: () => {
        alert("Error al obtener partidas, no se van a poder guardar correctamente los resultados...")
      }
    })
  }

  guess(index: number){
    const letter = this.letters.at(index);
    if(this.word?.word.includes(letter!)){  
      this.guessed += letter;
    }
    else{
      this.notguessed += letter;
      if(this.notguessed.length < 5){
        this.points -= 20;
      } else {
        this.points -= 10;
      }
    }
    if(this.guessed.includes(this.word?.word!)){
      alert("GANASTE");
      this.submitScore();
      this.start();
    }
    if(this.notguessed.length == 6){
      alert("PERDISTE");
      this.submitScore();
      this.start();
    }
  }

  submitScore(){
    const score: PostScore = {
      playerName: this.player.username,
      word: this.word?.word!,
      attemptsLeft: 6 - (this.notguessed.length),
      score: this.points,
      date: new Date().toLocaleString(),
      idGame: 'P' + this.matches.toString()
    }
    this.scoreService.postScore(score).subscribe({
      next: (score: Score) => {
        alert("Puntuación registrada, puntos: " + score.score)
      },
      error: () => {
        alert("Error al registrar puntuación");
      }
    })
  }
}
