import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalOpen: boolean = false;
  modalOpen$ = new BehaviorSubject<boolean>(this.modalOpen);
  modalConfirmed$ = new BehaviorSubject<any>(false);

  
  constructor() { }

  data: any;

  openDialog(message: string, data: any): void {
    this.data = data;
    this.modalOpen = true;
    this.modalOpen$.next(this.modalOpen);
  }

  confirmDialog(confirmed: any): void {
    this.modalOpen = false;
    this.modalConfirmed$.next(confirmed ? this.data : false);
  }
}
