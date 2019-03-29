import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { Phone } from '../../models/phone';
import { Router, ActivatedRoute } from '@angular/router';
import { v4 as uuid } from 'uuid';
import { IContactsService } from '../../interfaces/contacts-service';
import { ContactFactoryService } from '../../services/contacts/contact-factory.service';
import { SeoService } from '../../services/seo/seo.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private contactFactory: ContactFactoryService, private seo: SeoService) { 
    this.data = new Contact(uuid(), "", "");
  }

  contactService: IContactsService;
  data: Contact;
  isEdit: boolean = false;
  fileToUpload: File = null;

  ngOnInit() {
    this.contactService = this.contactFactory.create();
    this.isEdit = this.router.url.indexOf('/edit') > -1;
    
    if(this.isEdit) {
      const contactId = this.route.snapshot.paramMap.get('contact');    
      this.contactService.contact$.subscribe(result => {
        this.data = result;
      });

      this.contactService.getContact(contactId);
    }

    this.seo.generateTags({
      title: this.isEdit ? `Typeqast Edit Contact - ${this.data.firstName} ${this.data.lastName}` : `Typeqast Add Contact`,
      description: "Typeqast contact card.",
      image: this.data.imgUrl
    });
  }

  addNumber(): void {
    let phone: Phone = {
      label: "",
      name: ""
    }
    this.data.numbers.push(phone);
  }
  
  setFavorite(): void {
    this.data.favorite = !this.data.favorite;
  }

  submit(): void {
    if(this.isEdit) {
      this.contactService.editContact(this.data);
    } else {
      this.contactService.addContact(this.data);
    }
    this.router.navigate(["/"]);
  }

  cancel(): void {
    this.router.navigate(["/"]);
  }

  get checkImgExists(): boolean {
    return this.data && this.data.imgUrl.length > 0;
  }

  handleImgUpload(files: FileList): void {
    this.fileToUpload = files.item(0);
    this.getBase64(this.fileToUpload);
  }

  clearImg(event): void {
    setTimeout(() => {
      if(this.checkImgExists) {
        this.data.imgUrl = "";
      }
      event.stopPropagation();
    }, 20);
  }

  getBase64(image): void {
    let me = this;
    let file = image;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (this) {
      me.data.imgUrl = reader.result.toString();
    };
  }

  removeNumber(i: number) {
    this.data.numbers.splice(i, 1);
  }
}
