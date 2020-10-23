import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutRoutingModule,
  ]
})

export class LayoutModule { }
