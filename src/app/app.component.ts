import { Component } from '@angular/core';
import { DictionaryService } from './question-and-answer-block/dictionary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DictionaryService]
})
export class AppComponent {
  private questionNumber : number = 1;
  private isAnswerCorrect : boolean = false;

  getAnswerFromUser(answer : boolean) : void {
    this.questionNumber++;
    this.isAnswerCorrect = answer;
  }
}
