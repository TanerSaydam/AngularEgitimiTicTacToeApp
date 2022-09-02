import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CanDeactiveGuard } from './components/home/table/guard/can-deactive.guard';
import { TableComponent } from './components/home/table/table.component';
import { AuthGuard } from './components/login/guard/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,    
  },
  {
    path: 'register',
    component: RegisterComponent,    
  },
  {
    path: 'table/:value',
    component: TableComponent,  
    canDeactivate: [CanDeactiveGuard]  
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
