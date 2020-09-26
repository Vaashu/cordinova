import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
let root:string = '/login';
if (localStorage.getItem('ROLE') == "admin") {
  root = "/admin-dashboard";
} else {
  root = "/home";
}
const routes: Routes = [
  { path: '', redirectTo:root, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin-dashboard', component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'admin'
    }
  },
  { path: 'home', component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'manager'
    }
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
