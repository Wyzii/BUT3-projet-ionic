import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.page.html',
  styleUrls: ['./game-details.page.scss'],
})
export class GameDetailsPage implements OnInit {
  game: any;
  gameId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private gamesService: GamesService
  ) {}

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('id');
    if (this.gameId) {
      this.gamesService.getOne(this.gameId).subscribe((data) => {
        this.game = data;
      });
    }
  }

  goBack() {
    window.history.back();
  }

  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'Confirmer la suppression',
      message: 'Êtes-vous sûr de vouloir supprimer ce jeu ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Suppression annulée');
          },
        },
        {
          text: 'Supprimer',
          role: 'destructive',
          handler: () => {
            this.deleteGame();
          },
        },
      ],
    });

    await alert.present();
  }

  deleteGame() {
    if (this.gameId) {
      this.gamesService
        .delete(this.gameId)
        .then(() => {
          console.log('Jeu supprimé');
          this.router.navigate(['/games']);
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression :', error);
        });
    }
  }
}
