import { Injectable } from '@angular/core';
import { IContactsService } from '../../interfaces/contacts-service';
import { environment } from '../../../environments/environment';
import { ContactsService } from './contacts.service';
import { LocalContactsService } from './local-contacts.service';

@Injectable({
  providedIn: 'root'
})
export class ContactFactoryService {

  constructor(private contactsService: ContactsService, private localContactsService: LocalContactsService) { }

  create(): IContactsService {
    if(environment.localStorage) {
      return this.localContactsService;
    } else {
      return this.contactsService;
    }
  }
}
