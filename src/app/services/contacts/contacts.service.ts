import { Injectable } from '@angular/core';
import { IContactsService } from '../../interfaces/contacts-service';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { Contact } from '../../models/contact';
import { v4 as uuid } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators'
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService implements IContactsService {
  private _contact$ = new Subject<Contact>();
  private _contacts$ = new BehaviorSubject<Contact[]>([]);
  
  constructor(private http: HttpClient) { }

  get contacts$(): BehaviorSubject<Contact[]> {
    return this._contacts$;
  } 

  get contact$(): Subject<Contact> {
    return this._contact$;
  }

  getContacts(): Observable<Contact[]> {
    this.http.get<any>('https://uinames.com/api/?amount=25&ext').pipe(
      map(contacts => contacts.map(contact => {
        return {
          id: uuid(),
          firstName: contact.name,
          lastName: contact.surname,
          email: contact.email,
          numbers: [{
            label: "Default",
            name: contact.phone
          }],
          imgUrl: contact.photo,
          favorite: false
        }
      }))
    ).subscribe(result => {
      this.contacts$.next(result);
    });

    return this.contacts$;
  }

  getContact(id: string): Observable<Contact> {
    this.http.get<any>('https://uinames.com/api/?amount=1&ext').subscribe(result => {
      const res: Contact = {
              id: id,
              firstName: result.name,
              lastName: result.surname,
              email: result.email,
              numbers: [{
                label: "Default",
                name: result.phone
              }],
              imgUrl: result.photo,
              favorite: false
          };

      this.contact$.next(res);
    });

    return this.contact$;
  }

  addContact(item: Contact): boolean {
    return true;
  }

  editContact(contact: Contact): boolean {
    
    return true;
  }

  deleteContact(contact: string | Contact): boolean {
    return true;
  }

  setFavorite(contact: string | Contact): boolean {
    return true;
  }
}
