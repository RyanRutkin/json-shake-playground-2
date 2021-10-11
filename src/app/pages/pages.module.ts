import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './page-routing.module';
import { EditorPage } from './editor/Editor.page';
import { LogicsPage } from './logics/Logics.page';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PagesRoutingModule,
    SharedModule
  ],
  declarations: [EditorPage, LogicsPage]
})
export class PagesModule {}
