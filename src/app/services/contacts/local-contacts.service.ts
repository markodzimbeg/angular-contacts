import { Injectable } from '@angular/core';
import { IContactsService } from '../../interfaces/contacts-service';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { Contact } from '../../models/contact';

@Injectable({
  providedIn: 'root'
})
export class LocalContactsService implements IContactsService {
  private _contact$ = new Subject<Contact>();
  private _contacts$ = new BehaviorSubject<Contact[]>([]);
  constructor() { }

  get contacts$(): BehaviorSubject<Contact[]> {
    return this._contacts$;
  }

  get contact$(): Subject<Contact> {
    return this._contact$;
  }

  getContacts(): Observable<Contact[]> {
    of(<Contact[]>JSON.parse(localStorage.getItem('contacts'))).subscribe(result => {
      this._contacts$.next(result);
    });
    
    return this._contacts$;
  }

  getContact(id: string): Observable<Contact> {
    const items = <Contact[]>JSON.parse(localStorage.getItem('contacts'));
    const item = items.find(x => x.id == id);
    this._contact$.next(item);

    return this._contact$;
  }

  addContact(item: Contact): boolean {
    const items = this.contacts;
    items.unshift(item);
    localStorage.setItem('contacts', JSON.stringify(items));
    
    this._contacts$.next(items);
    
    return true;
  }

  editContact(contact: Contact): boolean {
    const items = this.contacts;
    const index = items.map(function(e) { return e.id; }).indexOf(contact.id);
    items[index] = contact;
    localStorage.setItem('contacts', JSON.stringify(items));
    
    this._contacts$.next(items);

    return true;
  }

  deleteContact(contact: string | Contact): boolean {
    const id: string = typeof contact === 'string' ? contact : contact.id;
    let items = this.contacts;
    items = items.filter(x => x.id !== id);
    localStorage.setItem('contacts', JSON.stringify(items));
    
    this._contacts$.next(items);
    
    return true;
  }

  setFavorite(contact: string | Contact): boolean {
    const id: string = typeof contact === 'string' ? contact : contact.id;
    const items = this.contacts;
    const index = items.map(function(e) { return e.id; }).indexOf(id);
    items[index].favorite = !items[index].favorite;
    localStorage.setItem('contacts', JSON.stringify(items));

    return true;
  }

  get contacts(): Contact[] {
    let items = <Contact[]>JSON.parse(localStorage.getItem('contacts'));
    if(!items) {
      items = [];
    }
    return items;
  }
}