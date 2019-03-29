import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactCardComponent } from './components/shared/contact-card/contact-card.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ViewContactComponent } from './components/view-contact/view-contact.component';

import { LocalContactsService } from './services/contacts/local-contacts.service';
import { ContactsService } from './services/contacts/contacts.service';
import { FilterContactsPipe } from './pipes/filter-contacts.pipe';
import { FavoriteContactsPipe } from './pipes/favorite-contacts.pipe';
import { DialogComponent } from './components/modal/dialog/dialog/dialog.component';
//import * as uuid from 'uuid';

@NgModule({
  declarations: [
    AppComponent,
    ContactCardComponent,
    ContactsComponent,
    AddContactComponent,
    ViewContactComponent,
    FilterContactsPipe,
    FavoriteContactsPipe,
    DialogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LocalContactsService, ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
