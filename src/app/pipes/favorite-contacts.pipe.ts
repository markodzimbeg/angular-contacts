import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact';

@Pipe({
  name: 'favoriteContacts'
})
export class FavoriteContactsPipe implements PipeTransform {
  transform(contacts: Contact[]): any {
    return contacts.filter(x => x.favorite);
  }
}
