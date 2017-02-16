import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DictionaryService } from './dictionary.service';
import { IDictionary } from './dictionary.interface';

@Component({
  selector: 'question-and-answer-block',
  templateUrl: './question-and-answer-block.component.html',
  styleUrls: ['./question-and-answer-block.component.css']
})
export class QuestionAndAnswerBlockComponent implements OnInit {
	private dictionary : IDictionary[] = [];
	private currentWord : string;
	private correctAnswer : string;
	private userAnswer : string;
	private answersArray : string[] = [];
	private noAnswer : boolean = false;
	private errorMessage: any;

	@Output() nextButtonClicked : EventEmitter<boolean> = new EventEmitter<boolean>(false);
	
	constructor(private _dictionaryService : DictionaryService) {
	}

    ngOnInit() {
    	this._dictionaryService.loadDictionary()
    	.subscribe(
    		dictionary => { this.dictionary = dictionary; console.log("DDD==", dictionary);},
    		error => this.errorMessage = <any>error,
    		this.loadQuestion.bind(this));
    		// () => this.loadQuestion());
    }

    setAnswer(i : number) {
    	this.userAnswer = this.answersArray[i];
    	this.noAnswer = false; // flag, that indicates an error if button is clicked without answer
    }

	loadQuestion() {
		console.log('hi from loadQuestion()');
		console.log(this.dictionary);
		console.log(this.dictionary.length);

		this.userAnswer = '-'; // '-' mean that there is no answer
		let randomAnswerIndex = Math.floor(Math.random()*5);
		console.log("this.dictionary from loadQuersion()", this.dictionary);
		for (let i=0; i<5; i++) {
			let arrayPointer=Math.floor(Math.random()*this.dictionary.length);
			this.answersArray[i] = this.dictionary[arrayPointer].rusWord;

			if (i === randomAnswerIndex) {
				this.currentWord = this.dictionary[arrayPointer].engWord;
				this.correctAnswer = this.dictionary[arrayPointer].rusWord;
				console.log ("Deleted: ", this.dictionary.splice(arrayPointer, 1)); // delete element
				console.log ("Dict.length: ", this.dictionary.length);
				console.log(this.currentWord);
				console.log(randomAnswerIndex);
			}			
		}
	}

	loadNextQuestion() {

		if (this.userAnswer === '-') {
				this.noAnswer = true;
			return;
		}
		this.nextButtonClicked.emit(this.userAnswer === this.correctAnswer ? true : false);

		
		if (this.userAnswer !== this.correctAnswer) {
		alert (`Ответ указан неверно. 
			Правильный ответ: ${this.correctAnswer}`);

		}
		
		this.loadQuestion();
	}
}
