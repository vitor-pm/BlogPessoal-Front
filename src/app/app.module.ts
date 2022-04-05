import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy,LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ThemeComponent } from './theme/theme.component';
import { ThemeEditComponent } from './edit/theme-edit/theme-edit.component';
import { ThemeDeleteComponent } from './delete/theme-delete/theme-delete.component';
import { PostEditComponent } from './edit/post-edit/post-edit.component';
import { PostDeleteComponent } from './delete/post-delete/post-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RegisterComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    ThemeComponent,
    ThemeEditComponent,
    ThemeDeleteComponent,
    PostEditComponent,
    PostDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
