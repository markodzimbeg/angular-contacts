import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../../models/contact';
import { IContactsService } from '../../interfaces/contacts-service';
import { ContactFactoryService } from '../../services/contacts/contact-factory.service';
import { contactFadeIn } from '../../animations/contacts';
import { Title } from '@angular/platform-browser';
import { SeoService } from '../../services/seo/seo.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  animations: [contactFadeIn] 
})
export class ContactsComponent implements OnInit, OnDestroy {

  constructor(private contactFactory: ContactFactoryService, private titleService: Title, private seo: SeoService) { }
  
  private contactService: IContactsService;
  contacts$;
  data: Contact[];
  isFavorites: boolean = false;
  filterQuery: string = "";
  filterChanged: boolean = false;

  ngOnInit() {
    this.titleService.setTitle('Contacts');
    this.contactService = this.contactFactory.create();
    this.subscribeContacts();
    this.contactService.getContacts();

    this.seo.generateTags({
      title: this.isFavorites ? `Typeqast Contacts - My Favorites` : `Typeqast Contacts - All`,
      description: "Typeqast contact card.",
      image: 'respources/assets/img/seo.png'
    });
  }

  private subscribeContacts(): void {
    this.contactService.contacts$.subscribe(result => {
      this.data = result;
    });
  }

  get favorites(): Contact[] {
    return this.data.filter(x => x.favorite);
  }

  toggleFavorites(data: boolean): void {
    this.isFavorites = data;
    this.filterChanged = !this.filterChanged;
  }
  
  ngOnDestroy(): void {
    if(this.contacts$) {
      this.contacts$.unsubscribe();
    }
  }
}
