import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { ActivatedRoute } from '@angular/router';
import { IContactsService } from '../../interfaces/contacts-service';
import { ContactFactoryService } from '../../services/contacts/contact-factory.service';
import { Title } from '@angular/platform-browser';
import { SeoService } from '../../services/seo/seo.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {

  constructor(private route: ActivatedRoute, private contactFactory: ContactFactoryService, private titleService: Title, private seo: SeoService) { }

  contactService: IContactsService;
  data!: Contact;

  ngOnInit() {
    this.contactService = this.contactFactory.create();
    
    const contactId = this.route.snapshot.paramMap.get('contact');
    

    this.contactService.contact$.subscribe(result => {
      this.data = result;

      this.titleService.setTitle(`Contact - ${this.data.firstName} ${this.data.lastName}`);

      this.seo.generateTags({
        title: `Typeqast Contact - ${this.data.firstName} ${this.data.lastName}`,
        description: "Typeqast contact card.",
        image: this.data.imgUrl
      });
    });

    this.contactService.getContact(contactId);
  }

  setFavorite(): void {
    this.data.favorite = !this.data.favorite;
    this.contactService.setFavorite(this.data.id);
  }
}
