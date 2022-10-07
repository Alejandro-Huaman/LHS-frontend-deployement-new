import { SetPasswordComponent } from './pages/password/SetPassword/SetPassword.component';
import { SetEmailComponent } from './pages/password/SetEmail/SetEmail.component';
import { DiagnosticComponent } from './pages/report/diagnostic/diagnostic.component';
import { HealthIndicatorComponent } from './pages/report/health-indicator/health-indicator.component';
import { MonitorTreatmentComponent } from './pages/report/monitor-treatment/monitor-treatment.component';
import { MonitPatientRiskComponent } from './pages/report/monit-patient-risk/monit-patient-risk.component';
import { EfficiencyComponent } from './pages/report/efficiency/efficiency.component';
import { GeneralDiagnosticComponent } from './pages/report/general-diagnostic/general-diagnostic.component';
import { GeneralHealthIndicatorComponent } from './pages/report/general-health-indicator/general-health-indicator.component';
import { TreatmentComponent } from './pages/report/treatment/treatment.component';
import { PatientRiskComponent } from './pages/report/patient-risk/patient-risk.component';
import { ClinicalHistoriesComponent } from './pages/clinical-histories/clinical-histories.component';
import { VigilantComponent } from './pages/vigilant/vigilant.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentDoctorComponent } from './pages/appointments/appointment-doctor/appointment-doctor.component';
import { AppointmentComponent } from './pages/appointments/appointment-patient/appointment.component';
import { MedicalScheduleComponent } from './pages/appointments/appointment-patient/medical-schedule/medical-schedule.component';
import { HomeComponent } from './pages/homes/home-doctor/home.component';
import { HomePatientComponent } from './pages/homes/home-patient/home-patient.component';
import { HomeStaffComponent } from './pages/homes/home-staff/home-staff.component';
import { LoginComponent } from './pages/login/login.component';
import { MedicalRecordsComponent } from './pages/medical-records/medical-records.component';
import { PatientRecordComponent } from './pages/medical-records/patient-record/patient-record.component';
import { RecordFormComponent } from './pages/appointments/appointment-doctor/appointment-form/record-form.component';
import { UpdateRecordComponent } from './pages/medical-records/update-record/update-record.component';
import { RegisterMedicalComponent } from './pages/registers/register-medical/register-medical.component';
import { RegisterStaffComponent } from './pages/registers/register-staff/register-staff.component';
import { RegisterUserComponent } from './pages/registers/register-user/register-user.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { AppointmentStaffComponent } from './pages/appointments/appointment-staff/appointment-staff.component';
import { MedicalScheduleStaffComponent } from './pages/appointments/appointment-register-staff/medical-schedule-staff/medical-schedule-staff.component';
import { StaffAppointmentFormComponent } from './pages/appointments/appointment-staff/staff-appointment-form/staff-appointment-form.component';
import { AppointmentRegisterStaffComponent } from './pages/appointments/appointment-register-staff/appointment-register-staff.component';
import { AppointmentHistoryComponent } from './pages/appointments/appointment-patient/appointment-history/appointment-history.component';
import { AttentionComponent } from './pages/Attention/Attention.component';
import { MedicineComponent } from './pages/Medicine/Medicine.component';

const routes: Routes = [
  {path: "register-user",component: RegisterUserComponent},
  {path: "login",component: LoginComponent},
  {path: "register-medical",component: RegisterMedicalComponent},
  {path: "register-staff",component: RegisterStaffComponent}, 
  {path: "medical-records",component: MedicalRecordsComponent},
  {path: "patient-record",component: PatientRecordComponent},
  {path: "update-record",component: UpdateRecordComponent},

  //Paciente
  {path: "patient/:id/appointment-patient",component: AppointmentComponent},
  {path: "patient/:patientid/medical-schedule/doctor/:doctorid",component: MedicalScheduleComponent},
  {path: "patient/:id/home-patient",component: HomePatientComponent},
  {path: "patient/:id/appointment-history",component: AppointmentHistoryComponent},

  //Personal (Staff)
  {path: "staff/:staffid/medical-schedule/doctor/:doctorid",component: MedicalScheduleStaffComponent},
  {path: "staff/:staffid/staff-appointment-form/patient/:patientid/appoint/:appointid",component: StaffAppointmentFormComponent},
  {path: "staff/:id/appointment-staff",component: AppointmentStaffComponent},
  {path: "staff/:id/appointment-staff-register",component: AppointmentRegisterStaffComponent},
  {path: "staff/:id/home-staff",component: HomeStaffComponent},
  {path: "staff/:id/vigilant",component:VigilantComponent},
  {path: "staff/:id/clinical-histories",component:ClinicalHistoriesComponent},
  {path: "staff/:id/reporter-general-patient-risk",component:PatientRiskComponent},
  {path: "staff/:id/reporter-patient-risk",component:MonitPatientRiskComponent},
  {path: "staff/:id/reporter-general-treatment",component:TreatmentComponent},
  {path: "staff/:id/reporter-treatment",component:MonitorTreatmentComponent},
  {path: "staff/:id/reporter-general-health-indicator",component:GeneralHealthIndicatorComponent},
  {path: "staff/:id/reporter-health-indicator",component:HealthIndicatorComponent},
  {path: "staff/:id/reporter-general-diagnostic",component:GeneralDiagnosticComponent},
  {path: "staff/:id/reporter-diagnostic",component:DiagnosticComponent},
  {path: "staff/:id/reporter-efficiency",component:EfficiencyComponent},
  {path: "staff/:id/staff-users",component: UsersPageComponent},
  {path: "staff/:id/register-user",component: RegisterUserComponent},
  {path: "staff/:id/register-medical",component: RegisterMedicalComponent},
  {path: "staff/:id/register-staff",component: RegisterStaffComponent},
  {path: "staff/:id/attention",component:AttentionComponent},
  {path: "staff/:id/medicines",component:MedicineComponent},

  //Doctor
  {path: "doctor/:doctorid/appointment-form/patient/:patientid/appoint/:appointid",component: RecordFormComponent},
  {path: "doctor/:id/appointment-doctor",component: AppointmentDoctorComponent},
  {path: "doctor/:id/home-doctor",component: HomeComponent},
  {path: "doctor/:id/vigilant",component:VigilantComponent},
  {path: "doctor/:id/clinical-histories",component:ClinicalHistoriesComponent},
  {path: "doctor/:id/reporter-general-patient-risk",component:PatientRiskComponent},
  {path: "doctor/:id/reporter-patient-risk",component:MonitPatientRiskComponent},
  {path: "doctor/:id/reporter-general-treatment",component:TreatmentComponent},
  {path: "doctor/:id/reporter-treatment",component:MonitorTreatmentComponent},
  {path: "doctor/:id/reporter-general-health-indicator",component:GeneralHealthIndicatorComponent},
  {path: "doctor/:id/reporter-health-indicator",component:HealthIndicatorComponent},
  {path: "doctor/:id/reporter-general-diagnostic",component:GeneralDiagnosticComponent},
  {path: "doctor/:id/reporter-diagnostic",component:DiagnosticComponent},
  {path: "doctor/:id/reporter-efficiency",component:EfficiencyComponent},
  {path: "doctor/:id/attention",component:AttentionComponent},
  {path: "doctor/:id/medicines",component:MedicineComponent},



  {path:"recoverpassword",component:SetEmailComponent},
  {path:"changepassword",component:SetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
