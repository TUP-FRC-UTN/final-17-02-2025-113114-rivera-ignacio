import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { GameComponent } from './components/game/game.component';
import { authGuard } from './guard/auth.guard';
import { ScoresComponent } from './components/scores/scores.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent},
    { path: "jugar", component: GameComponent, canActivate: [authGuard]},
    { path: "puntuaciones", component: ScoresComponent, canActivate: [authGuard]},
    { path: "", redirectTo: "/jugar", pathMatch: "full"},
    { path: "**", redirectTo: "/jugar", pathMatch: "full"}
];
