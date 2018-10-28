import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';

import { AllService } from './all.service';
import { ViewComponent } from './users/view/view.component';
import { KeysPipe } from './keys.pipe';
import { StructDirective } from './struct.directive';

const r:Routes = [
    //{path: '', redirectTo:'home' ,pathMatch:'full'},
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'users',component:UsersComponent,children:[
      {path:'view/:id',component:ViewComponent},
      {path:'edit/:id',component:RegisterComponent}
    ]},
    { path:'login',component:LoginComponent },
    { path:'register',component:RegisterComponent },
    { path: '**',component:NotfoundComponent}
]



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotfoundComponent,
    ViewComponent,
    KeysPipe,
    StructDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(r),
    FormsModule, 
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [AllService],
  bootstrap: [AppComponent]
})
export class AppModule { }
