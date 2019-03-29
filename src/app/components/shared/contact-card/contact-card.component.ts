import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../../models/contact';
import { Router } from '@angular/router';
import { IContactsService } from '../../../interfaces/contacts-service';
import { ContactFactoryService } from '../../../services/contacts/contact-factory.service';
import { ModalService } from '../../../services/modal/modal.service';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {

  constructor(private contactFactory: ContactFactoryService, private router: Router, private modalService: ModalService) { }

  @Input() data: Contact;
  contactService: IContactsService;

  ngOnInit() {
    this.contactService = this.contactFactory.create();
  }

  deleteContact(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.modalService.openDialog(this.data.id, this.data);
  }

  onToggleFavorite(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.data.favorite = !this.data.favorite;
    this.contactService.setFavorite(this.data.id);
  }

  onSelectContact() {
    this.router.navigate(['/contact', this.data.id])
  }

}
