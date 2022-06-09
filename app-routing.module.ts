import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateClientsComponent } from './activate-clients/activate-clients.component';
import { ActiveRequestComponent } from './active-request/active-request.component';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth-guard.service';
import { CardsComponent } from './cards/cards.component';
import { ChooseClientsViewComponent } from './choose-clients-view/choose-clients-view.component';
import { ClientsDashboardComponent } from './clients-dashboard/clients-dashboard.component';
import { ConsumersTableComponent } from './consumers-table/consumers-table.component';
import { DecodedPropertiesComponent } from './decoded-properties/decoded-properties.component';
import { GraphsComponentComponent } from './graphs-component/graphs-component.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PandasGraphsComponent } from './pandas-graphs/pandas-graphs.component';
import { ProducersViewComponent } from './producers-view/producers-view.component';
import { RequestsHistoryComponent } from './requests-history/requests-history.component';
import { UnauthorizedFormComponent } from './unauthorized-form/unauthorized-form.component';

const routes: Routes = [
  {path:"ClientConsumersSelect", component:ChooseClientsViewComponent, canActivate: [AuthGuardService]},
  {path:"DecodedFrameProducer", component:NavBarComponent, canActivate: [AuthGuardService], children:
    [
        {path:'form/:name', component:DecodedPropertiesComponent, canActivate: [AuthGuardService]},
    ]},
    {path: "AnalyzedData", component:ProducersViewComponent, canActivate: [AuthGuardService], children: 
    [
      {path:'form/:name', component:DecodedPropertiesComponent, canActivate: [AuthGuardService]},
    ]},
    {path: "requests", component:ClientsDashboardComponent, canActivate: [AuthGuardService]},
    {path: "grapgs", component:RequestsHistoryComponent,canActivate: [AuthGuardService]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

