import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal/modal.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    
  }

  confirmDialog(confirmed: boolean) {
    this.modalService.confirmDialog(confirmed);
  }

}
