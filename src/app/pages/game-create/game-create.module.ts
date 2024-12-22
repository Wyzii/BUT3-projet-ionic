import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GameCreatePageRoutingModule } from './game-create-routing.module';
import { GameCreatePage } from './game-create.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [GameCreatePage], 
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GameCreatePageRoutingModule,
    ComponentsModule,
  ],
})
export class GameCreatePageModule {}
