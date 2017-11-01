import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MaterialModule } from '@angular/material'; 
//import { FlexLayoutModule } from '@angular/flex-layout';
//import 'hammerjs';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

import { AppRoutingModule } from './app-routing/app-routing.module';

import {PromotionService} from './Services/promotion.service'
import { DishService } from './services/dish.service';
import { LeaderService } from './services/leader.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    //FormsModule,
    //HttpModule,
    AppRoutingModule
    //MaterialModule,
    //FlexLayoutModule
  ],
  providers: [DishService, PromotionService, LeaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }