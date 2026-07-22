import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { EventsComponent } from './pages/events/events.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { LegalComponent } from './pages/legal/legal.component';
import { TermsComponent } from './pages/terms/terms.component';
import { DropsComponent } from './pages/drops/drops.component';
import { ErrorComponent } from './pages/error/error.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    EventsComponent,
    ContactComponent,
    AboutComponent,
    FaqComponent,
    LegalComponent,
    PrivacyComponent,
    TermsComponent,
    NavbarComponent,
    FooterComponent,
    ProductDetailComponent,
    DropsComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}