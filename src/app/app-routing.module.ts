import { DosyalarComponent } from './components/dosyalar/dosyalar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { KayitlarComponent } from './components/kayitlar/kayitlar.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard,redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectLogin=()=>redirectUnauthorizedTo(['/login']);
const routes: Routes = [
  {
    path:'', 
    component:
     HomeComponent,
    canActivate:[AngularFireAuthGuard],
    data:{
    authGuardPipe:redirectLogin
    }
    },
  {path: 'kayitlar', component: KayitlarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dosyalar', component: DosyalarComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
