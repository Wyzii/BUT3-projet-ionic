import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GameFormComponent } from './game-form/game-form.component';

@NgModule({
  declarations: [GameFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports: [GameFormComponent],
})
export class ComponentsModule {}
