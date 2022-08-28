import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasswordComponent } from './Authentification/password/password.component';
import { JwtInterceptorService } from './Authentification/jwt-interceptor.service';
import { AuthGuard } from './Authentification/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import { ResetPasswordComponent } from './Authentification/reset-password/reset-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from "@angular/material/card";
import { ToastrModule } from 'ngx-toastr';
import { PageAdminComponent } from './page-admin/page-admin.component';
import {MatMenuModule} from "@angular/material/menu";
import { CalendrierComponent } from './calendrier/calendrier.component';
import { FichesPatientsComponent } from './fiches-patients/fiches-patients.component';
import { OrdonnancesComponent } from './ordonnances/ordonnances.component';
import { GestionDesPatientsComponent } from './gestion-des-patients/gestion-des-patients.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import { UpdatepatientComponent } from './gestion-des-patients/updatepatient/updatepatient.component';
import { AjoutpatientComponent } from './gestion-des-patients/ajoutpatient/ajoutpatient.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { CertificatmedicalComponent } from './certificatmedical/certificatmedical.component';
import { LettreAUnCofrereComponent } from './lettre-a-un-cofrere/lettre-a-un-cofrere.component';
import { CertificatmedicalaptitudeComponent } from './certificatmedicalaptitude/certificatmedicalaptitude.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { DemandeRendezVousComponent } from './demande-rendez-vous/demande-rendez-vous.component';
import { CalenderComponent } from './calender/calender.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from "primeng";
import { ListeRendezVousComponent } from './liste-rendez-vous/liste-rendez-vous.component';
import { NavbarComponent } from './navbar/navbar.component';



FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    PasswordComponent,
    HomeComponent,
    ResetPasswordComponent,
    PageAdminComponent,
    CalendrierComponent,
    FichesPatientsComponent,
    OrdonnancesComponent,
    GestionDesPatientsComponent,
    StatistiquesComponent,
    UpdatepatientComponent,
    AjoutpatientComponent,
    RendezVousComponent,
    CertificatmedicalComponent,
    LettreAUnCofrereComponent,
    CertificatmedicalaptitudeComponent,
    AcceuilComponent,
    DemandeRendezVousComponent,
    CalenderComponent,
    ListeRendezVousComponent,
    NavbarComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatDividerModule,
    FontAwesomeModule,
    FullCalendarModule,
    DialogModule,
    ButtonModule
  ],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorService,
    multi: true
  },AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
