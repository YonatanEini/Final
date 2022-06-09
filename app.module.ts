import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CardComponent } from './card/card.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { DecodedPropertiesComponent } from './decoded-properties/decoded-properties.component';
import { NamesService } from './names.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActiveRequestComponent } from './active-request/active-request.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { ConsumersTableComponent } from './consumers-table/consumers-table.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GraphsComponentComponent } from './graphs-component/graphs-component.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ActivateClientsComponent } from './activate-clients/activate-clients.component';
import { CardsComponent } from './cards/cards.component';
import { AppHomePageComponent } from './app-home-page/app-home-page.component';
import { ClientsDashboardComponent } from './clients-dashboard/clients-dashboard.component';
import { PandasGraphsComponent } from './pandas-graphs/pandas-graphs.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RequestsHistoryComponent } from './requests-history/requests-history.component';
import { UnauthorizedFormComponent } from './unauthorized-form/unauthorized-form.component';
import { HistoryViewComponent } from './history-view/history-view.component';
import { ChooseClientsViewComponent } from './choose-clients-view/choose-clients-view.component';
import { FillPropertiesViewComponent } from './fill-properties-view/fill-properties-view.component';
import { ProducersViewComponent } from './producers-view/producers-view.component';
import { LoginSigninFormComponent } from './login-signin-form/login-signin-form.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { AuthGuardService } from './auth-guard.service';
const materialModules = [
  MatButtonModule,
  MatIconModule
];
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CardComponent,
    MainMenuComponent,
    DecodedPropertiesComponent,
    ActiveRequestComponent,
    LoadingScreenComponent,
    ConsumersTableComponent,
    HomePageComponent,
    GraphsComponentComponent,
    ActivateClientsComponent,
    CardsComponent,
    AppHomePageComponent,
    ClientsDashboardComponent,
    PandasGraphsComponent,
    LoginFormComponent,
    RequestsHistoryComponent,
    UnauthorizedFormComponent,
    HistoryViewComponent,
    ChooseClientsViewComponent,
    FillPropertiesViewComponent,
    ProducersViewComponent,
    LoginSigninFormComponent,
    LogoutButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    materialModules,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
  ],
  exports:[
    materialModules
  ],
  providers: [NamesService, NavBarComponent, AuthGuardService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
