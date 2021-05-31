import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SpeechToTextComponent} from './containers/match-combination/match-combination.component';
import { ItemsGridModule } from '../../shared/items-grid/items-grid.module';
import { ItemsRoutingModule } from './items-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const modules = [FormsModule, ReactiveFormsModule, ItemsGridModule, ItemsRoutingModule, NgbModule, CommonModule, BrowserModule];

const components = [SpeechToTextComponent];

@NgModule({
  imports: modules,
  declarations: components,
  exports: [...components]
})
export class ItemsModule {
}
