import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertsComponent } from '../alerts/alerts.component';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(private bsmodal: BsModalService) {}

  private showAlert(message: string, type: string) {
    const bsModalRef: BsModalRef = this.bsmodal.show(AlertsComponent);

    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
  }

  showAlertDanger(message: string) {
    this.showAlert(message, 'danger');
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, 'success');
  }

  showAlertInfo(message: string) {
    this.showAlert(message, 'info');
  }
}
