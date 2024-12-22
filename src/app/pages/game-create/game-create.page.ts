import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-create',
  template: `
    <app-game-form
      [existingCategories]="existingCategories"
      [submitButtonText]="'Créer le jeu'"
      (formSubmit)="createGame($event)"
    ></app-game-form>
  `,
})
export class GameCreatePage implements OnInit {
  existingCategories: string[] = [];

  constructor(private firestore: AngularFirestore, private router: Router) {}

  ngOnInit() {
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

  createGame(gameData: any) {
    this.firestore.collection('games').add(gameData).then(() => {
      this.router.navigate(['/games']);
    });
  }
}
