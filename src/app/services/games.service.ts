import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private firestore: AngularFirestore) {}

  getAll(): Observable<Game[]> {
    return this.firestore
      .collection('games')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Game;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getOne(gameId: string): Observable<any> {
    return this.firestore.doc(`games/${gameId}`).valueChanges();
  }

  // create(gameData: any): Promise<void> {
  //   return this.firestore.collection('games').add(gameData).then(() => {});
  // }
  
  // update(gameId: string, gameData: any): Promise<void> {
  //   return this.firestore.doc(`games/${gameId}`).update(gameData);
  // }

  delete(gameId: string): Promise<void> {
    return this.firestore.doc(`games/${gameId}`).delete();
  }
}
