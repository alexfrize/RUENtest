import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { QuestionAndAnswerBlockComponent } from './question-and-answer-block/question-and-answer-block.component';
import { ScoreTableComponent } from './score-table/score-table.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionAndAnswerBlockComponent,
    ScoreTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
