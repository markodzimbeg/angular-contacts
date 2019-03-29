import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact';

@Pipe({
  name: 'filterContacts'
})
export class FilterContactsPipe implements PipeTransform {

  transform(contacts: Contact[], args?: any): any {
    return contacts ? contacts.filter(x => {
      return x.firstName.toLowerCase().includes(args.toLowerCase()) || 
      x.lastName.toLowerCase().includes(args.toLowerCase()) || 
      (x.email && x.email.toLowerCase().includes(args.toLowerCase()));
    }) : false;
  }

}
