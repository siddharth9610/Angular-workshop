import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { SharedModule } from './shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { BreedState } from './states/breed.state';
import { CatState } from './states/cat.state';

import { MainComponent } from './components/main/main.component';
import { CatsCardComponent } from './components/main/cats-card/cats-card.component';
import { HeaderComponent } from './components/main/header/header.component';
import { FiltersComponent } from './components/main/filters/filters.component';
import { BreedsFiltersComponent } from './components/main/filters/breeds-filters/breeds-filters.component';
import { LimitFiltersComponent } from './components/main/filters/limit-filters/limit-filters.component';
import { CatDialogComponent } from './components/main/cat-dialog/cat-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CatsCardComponent,
    HeaderComponent,
    FiltersComponent,
    BreedsFiltersComponent,
    LimitFiltersComponent,
    CatDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    NgxsModule.forRoot([BreedState, CatState]),
    NgxsFormPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
