import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-game-edit',
  template: `
    <app-game-form
      [existingCategories]="existingCategories"
      [gameData]="gameData"
      [submitButtonText]="'Modifier le jeu'"
      (formSubmit)="updateGame($event)"
    ></app-game-form>
  `,
})
export class GameEditPage implements OnInit {
  gameId: string | null = null;
  gameData: any = null;
  existingCategories: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('id');
    if (this.gameId) {
      this.firestore
        .doc(`games/${this.gameId}`)
        .valueChanges()
        .subscribe((game) => {
          this.gameData = game;
        });
    }

    this.firestore
      .collection('games')
      .valueChanges()
      .subscribe((games: any[]) => {
        const allCategories = games
          .map((game) => game.categories || [])
          .reduce((acc, categories) => acc.concat(categories), []);
        this.existingCategories = Array.from(new Set(allCategories));
      });
  }

  updateGame(gameData: any) {
    if (this.gameId) {
      this.firestore
        .doc(`games/${this.gameId}`)
        .update(gameData)
        .then(() => {
          this.router.navigate(['/games', this.gameId]);
        });
    }
  }
}
