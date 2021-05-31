import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {VideoAnalyzerComponent} from './home/video-analyzer.component';
import {SpeechToTextComponent} from './stt/match-combination.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoAnalyzerComponent,
    SpeechToTextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
