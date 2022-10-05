import { SetEmailComponent } from './pages/password/SetEmail/SetEmail.component';
import { AppointedateUpdateComponent } from './pages/appointments/appointment-staff/dialog/appointedate-update/appointedate-update.component';
import { DiagnosticComponent } from './pages/report/diagnostic/diagnostic.component';
import { HealthIndicatorComponent } from './pages/report/health-indicator/health-indicator.component';
import { MonitorTreatmentComponent } from './pages/report/monitor-treatment/monitor-treatment.component';
import { MonitPatientRiskComponent } from './pages/report/monit-patient-risk/monit-patient-risk.component';
import { HeaderReporter2Component } from './pages/report/header-reporter2/header-reporter2.component';
import { EfficiencyComponent } from './pages/report/efficiency/efficiency.component';
import { GeneralDiagnosticComponent } from './pages/report/general-diagnostic/general-diagnostic.component';
import { GeneralHealthIndicatorComponent } from './pages/report/general-health-indicator/general-health-indicator.component';
import { TreatmentComponent } from './pages/report/treatment/treatment.component';
import { PatientRiskComponent } from './pages/report/patient-risk/patient-risk.component';
import { HeaderReporterComponent } from './pages/HeaderReporter/HeaderReporter.component';
import { ClinicalHistoriesComponent } from './pages/clinical-histories/clinical-histories.component';
import { VigilantComponent } from './pages/vigilant/vigilant.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterUserComponent } from './pages/registers/register-user/register-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { FirstNavbarComponent } from './pages/first-navbar/first-navbar.component';
import { ResultDialogComponent } from './pages/dialogs/result-dialog/result-dialog.component';

import { RegisterMedicalComponent } from './pages/registers/register-medical/register-medical.component';
import { RegisterStaffComponent } from './pages/registers/register-staff/register-staff.component';
import { HomeComponent } from './pages/homes/home-doctor/home.component';
import { AppointmentComponent } from './pages/appointments/appointment-patient/appointment.component';
import { MedicalScheduleComponent } from './pages/appointments/appointment-patient/medical-schedule/medical-schedule.component';
import { ResultDialogAppointmentComponent } from './pages/dialogs/result-dialog-appointment/result-dialog-appointment.component';
import { MedicalRecordsComponent } from './pages/medical-records/medical-records.component';
import { PatientRecordComponent } from './pages/medical-records/patient-record/patient-record.component';
import { RecordFormComponent } from './pages/appointments/appointment-doctor/appointment-form/record-form.component';
import { ResultDialogRecordComponent } from './pages/dialogs/result-dialog-record/result-dialog-record.component';
import { ResultDialogAncientComponent } from './pages/dialogs/result-dialog-ancient/result-dialog-ancient.component';
import { ResultDialogClinicComponent } from './pages/dialogs/result-dialog-clinic/result-dialog-clinic.component';
import { ResultDialogTreatmentComponent } from './pages/dialogs/result-dialog-treatment/result-dialog-treatment.component';
import { UpdateRecordComponent } from './pages/medical-records/update-record/update-record.component';
import { DialogUpdateDataComponent } from './pages/dialogs/dialog-update-data/dialog-update-data.component';
import { HomePatientComponent } from './pages/homes/home-patient/home-patient.component';
import { HomeStaffComponent } from './pages/homes/home-staff/home-staff.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UpdateDoctorComponent } from './pages/users-page/update-dialogs/update-doctor/update-doctor.component';
import { UpdateStaffComponent } from './pages/users-page/update-dialogs/update-staff/update-staff.component';
import { UpdatePatientComponent } from './pages/users-page/update-dialogs/update-patient/update-patient.component';
import { AppointmentDoctorComponent } from './pages/appointments/appointment-doctor/appointment-doctor.component';
import { AppointmentStaffComponent } from './pages/appointments/appointment-staff/appointment-staff.component';
import { DialogReportsComponent } from './pages/dialogs/dialog-reports/dialog-reports.component';
import { HttpClientModule } from '@angular/common/http';
import { StaffAppointmentFormComponent } from './pages/appointments/appointment-staff/staff-appointment-form/staff-appointment-form.component';
import { UpdateDiagnosticDialogComponent } from './pages/appointments/update-dialog/update-diagnostic-dialog/update-diagnostic-dialog.component';
import { UpdateTreatmentDialogComponent } from './pages/appointments/update-dialog/update-treatment-dialog/update-treatment-dialog.component';
import { AppointmentRegisterStaffComponent } from './pages/appointments/appointment-register-staff/appointment-register-staff.component';
import { MedicalScheduleStaffComponent } from './pages/appointments/appointment-register-staff/medical-schedule-staff/medical-schedule-staff.component';
import { SetPasswordComponent } from './pages/password/SetPassword/SetPassword.component';
import { AppointmentHistoryComponent } from './pages/appointments/appointment-patient/appointment-history/appointment-history.component';
import { AppointmentRatingComponent } from './pages/appointments/appointment-patient/appointment-history/appointment-rating/appointment-rating.component';
import { ResultDialogLoginComponent } from './pages/dialogs/result-dialog-login/result-dialog-login.component';

@NgModule({
  declarations: [									
    AppComponent,
      RegisterUserComponent,
      LoginComponent,
      FirstNavbarComponent,
      ResultDialogComponent,
      RegisterMedicalComponent,
      RegisterStaffComponent,
      HomeComponent,
      AppointmentComponent,
      MedicalScheduleComponent,
      ResultDialogAppointmentComponent,
      MedicalRecordsComponent,
      PatientRecordComponent,
      RecordFormComponent,
      ResultDialogRecordComponent,
      ResultDialogAncientComponent,
      ResultDialogClinicComponent,
      ResultDialogTreatmentComponent,
      UpdateRecordComponent,
      DialogUpdateDataComponent,
      HomePatientComponent, 
      HomeStaffComponent,
      UsersPageComponent,
      UpdateDoctorComponent,
      UpdateStaffComponent,
      UpdatePatientComponent,
      VigilantComponent,
      ClinicalHistoriesComponent,
      HeaderReporterComponent,
      PatientRiskComponent,
      TreatmentComponent,
      GeneralHealthIndicatorComponent,
      GeneralDiagnosticComponent,
      EfficiencyComponent,
      HeaderReporter2Component,
      MonitPatientRiskComponent,MonitorTreatmentComponent,
      HealthIndicatorComponent,
      DiagnosticComponent,
      StaffAppointmentFormComponent,
      AppointmentDoctorComponent,
      AppointmentStaffComponent,
      DialogReportsComponent,
      UpdateDiagnosticDialogComponent,
      UpdateTreatmentDialogComponent,
      AppointmentRegisterStaffComponent,
      MedicalScheduleStaffComponent,
      AppointedateUpdateComponent,
      SetEmailComponent,
      SetPasswordComponent,
      AppointmentHistoryComponent,
      AppointmentRatingComponent,
      ResultDialogLoginComponent

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
