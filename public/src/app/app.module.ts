import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from "@angular/platform-browser";
import { AgGridModule } from 'ag-grid-angular';
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
import { RequestsComponent } from "./components/requests/requests.component";
import { RequestCreateComponent } from "./components/requests/request-create/request-create.component";
import { ToasterService } from './services/toaster.service';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { RolesService } from './services/role.service';
import { RequestService } from './services/request.service';
import { AuthInterceptorService } from "./authInterceptor.service";
import { RequestCellRendererComponent } from './components/cell_renderer/requestCellRenderer/cell_renderer.component';
import { UserCellRendererComponent } from './components/cell_renderer/userCellRenderer/cell_renderer.component';
import { RequestInteractComponent } from './components/requests/request-interact/request-interact.component';
import { ExcelImport } from "./components/excelImport/excelImport.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "home/register", component: RegisterComponent },
  { path: "home", component: AdminComponent },
  { path: "home/user", component: UserComponent },
  { path: "category", component: CategoryComponent },
  { path: "category/create", component: CreateCategoryComponent },
  { path: "roles", component: RolesComponent },
  { path: "roles/create", component: CreateRolesComponent },
  { path: "requests", component: RequestsComponent },
  { path: "requests/create", component: RequestCreateComponent },
  { path: "requests/edit/:id", component: RequestCreateComponent },
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
    RequestsComponent,
    RequestCreateComponent,
    RequestCellRendererComponent,
    UserCellRendererComponent,
    RequestInteractComponent,
    ExcelImport
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
  entryComponents:[RequestCellRendererComponent, UserCellRendererComponent],
  providers: [UserService, CategoryService, RolesService, RequestService, ToasterService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
