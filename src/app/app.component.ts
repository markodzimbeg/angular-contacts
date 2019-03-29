import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalService } from './services/modal/modal.service';
import { IContactsService } from './interfaces/contacts-service';
import { ContactFactoryService } from './services/contacts/contact-factory.service';
import { Contact } from './models/contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor (private modalService: ModalService, private contactFactory: ContactFactoryService){ }

  contactService: IContactsService;

  ngOnInit() {
    this.contactService = this.contactFactory.create();
    this.modalService.modalConfirmed$.subscribe(result => {
      if(typeof(result) == "object") {
        this.contactService.deleteContact(result.id);
      }
    });
  }

  private confirmModal() {
    this.modalService.confirmDialog(false);
  }

  get modalOpen(): boolean {
    return this.modalService.modalOpen;
  }
}
