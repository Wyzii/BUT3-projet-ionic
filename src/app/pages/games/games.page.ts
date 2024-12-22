import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  jeux: Game[] = [];

  constructor(private gamesService: GamesService) {}

  ngOnInit() {
    this.gamesService.getAll().subscribe((data: Game[]) => {
      this.jeux = data;
    });
  }
}
