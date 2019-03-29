import { Contact } from '../models/contact';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

export interface IContactsService {
    contacts$: BehaviorSubject<Contact[]>;
    contact$: Subject<Contact>;

    getContacts(): Observable<Contact[]>; 
    getContact(id: string): Observable<Contact>;
    addContact(item: Contact): boolean;
    editContact(item: Contact): boolean;
    deleteContact(id: string | Contact): boolean;
    setFavorite(contact: string | Contact): boolean;
}