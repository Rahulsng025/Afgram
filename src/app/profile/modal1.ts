// modal1.component.ts
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal1',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Modal 1
        </ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="closeModal()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Modal content -->
    </ion-content>
  `
})
export class Modal1Component {
  constructor(private modalController: ModalController) {}

  async closeModal() {
    await this.modalController.dismiss();
  }
}

