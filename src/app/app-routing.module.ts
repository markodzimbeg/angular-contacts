import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ViewContactComponent } from './components/view-contact/view-contact.component';

const routes: Routes =
 [
  { path: '', component: ContactsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'contact/add', component: AddContactComponent },
  { path: 'contact/edit/:contact', component: AddContactComponent },
  { path: 'contact/:contact', component: ViewContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
