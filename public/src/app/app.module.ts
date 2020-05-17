import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { BrowserModule } from "@angular/platform-browser";
import { AgGridModule } from "ag-grid-angular";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { UserComponent } from "./components/user/user.component";
import { AdminComponent } from "./components/admin/admin.component";
import { CategoryComponent } from "./components/category/category.component";
import { CreateCategoryComponent } from "./components/category/create-category/create-category.component";
import { RolesComponent } from "./components/roles/roles.component";
import { CreateRolesComponent } from "./components/roles/create-roles/create-roles.component";
import { RequestsMedicalComponent } from "./components/requests/requests-medical/requests-medical.component";
import { RequestCreateComponent } from "./components/requests/request-create/request-create.component";
import { ToasterService } from "./services/toaster.service";
import { UserService } from "./services/user.service";
import { CategoryService } from "./services/category.service";
import { RolesService } from "./services/role.service";
import { RequestService } from "./services/request.service";
import { MedicalRequestService } from "./services/medicalRequest.service";
import { AuthInterceptorService } from "./authInterceptor.service";
import { RequestCellRendererComponent } from "./components/cell_renderer/requestCellRenderer/cell_renderer.component";
import { UserCellRendererComponent } from "./components/cell_renderer/userCellRenderer/cell_renderer.component";
import { RequestInteractComponent } from "./components/requests/request-interact/request-interact.component";
import { ExcelImport } from "./components/excelImport/excelImport.component";
import { RequestHomeComponent } from "./components/requests/request-home/request-home.component";
import { RequestsNonMedicalComponent } from "./components/requests/requests-nonmedical/requests-nonmedical.component";
import { RequestCreateMedicalComponent } from "./components/requests/request-create/medical/request-create.component";
import { RequestCreateNonMedicalComponent } from "./components/requests/request-create/nonmedical/request-create.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "home/register", component: RegisterComponent },
  { path: "home", component: AdminComponent },
  { path: "user", component: UserComponent },
  { path: "user/edit/:id", component: RegisterComponent },
  { path: "category", component: CategoryComponent },
  { path: "category/create", component: CreateCategoryComponent },
  { path: "roles", component: RolesComponent },
  { path: "roles/create", component: CreateRolesComponent },
  { path: "requests/medical", component: RequestsMedicalComponent },
  { path: "requests/non-medical", component: RequestsNonMedicalComponent },
  { path: "requests/home", component: RequestHomeComponent },
  { path: "requests/create/medical", component: RequestCreateMedicalComponent },
  {
    path: "requests/create/nonmedical",
    component: RequestCreateNonMedicalComponent,
  },
  {
    path: "requests/edit/medical/:id",
    component: RequestCreateMedicalComponent,
  },
  {
    path: "requests/edit/nonmedical/:id",
    component: RequestCreateNonMedicalComponent,
  },
  { path: "requests/interact/:id", component: RequestInteractComponent },
  { path: "requests/import", component: ExcelImport },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AdminComponent,
    CategoryComponent,
    CreateCategoryComponent,
    RolesComponent,
    CreateRolesComponent,
    RequestsMedicalComponent,
    RequestCreateComponent,
    RequestCellRendererComponent,
    UserCellRendererComponent,
    RequestInteractComponent,
    ExcelImport,
    RequestHomeComponent,
    RequestsNonMedicalComponent,
    RequestCreateMedicalComponent,
    RequestCreateNonMedicalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AgGridModule.withComponents([]),
  ],
  entryComponents: [RequestCellRendererComponent, UserCellRendererComponent],
  providers: [
    UserService,
    CategoryService,
    RolesService,
    RequestService,
    ToasterService,
    MedicalRequestService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
