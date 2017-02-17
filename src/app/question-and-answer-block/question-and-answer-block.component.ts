import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { transition, trigger, state, style, animate, keyframes } from '@angular/core';
import { DictionaryService } from './dictionary.service';
import { IDictionary } from './dictionary.interface';

@Component({
  selector: 'question-and-answer-block',
  templateUrl: './question-and-answer-block.component.html',
  styleUrls: ['./question-and-answer-block.component.css'],
  animations: [
  	trigger('answersAnimation', [
  			state('visible', style({
  				transform: 'translate(000px)',
  				opacity: 1
  			})),
  			state('hidden', style({
  				transform: 'translate(100px)',
  				opacity: 0
  			})),
  			transition('visible => hidden', animate('300ms ease-in')),
  			transition('hidden => visible', animate('300ms ease-out'))
  		]),
	trigger('titleAnimation', [
  			state('visible', style({
  				transform: 'translate(000px)',
  				opacity: 1
  			})),
  			state('hidden', style({
  				transform: 'translate(-100px)',
  				opacity: 0
  			})),
  			transition('visible => hidden', animate('300ms ease-in-out')),
  			transition('hidden => visible', animate('300ms ease-in-out'))
  		])  	
  ]
})

/*
=============================== Main class functions and variables ===============================
*/

export class QuestionAndAnswerBlockComponent implements OnInit {
	private dictionary : IDictionary[] = [];
	private currentWord : string;
	private correctAnswer : string;
	private userAnswer : string;
	private answersArray : string[] = [];
	private noAnswer : boolean = false;
	private errorMessage: any;

	animState : string = 'visible';

	@Output() nextButtonClicked : EventEmitter<boolean> = new EventEmitter<boolean>(false);
	
	constructor(private _dictionaryService : DictionaryService) {
	}

    ngOnInit() {
    	this._dictionaryService.loadDictionary()
    	.subscribe(
    		dictionary => this.dictionary = dictionary,
    		error => this.errorMessage = <any>error,
    		this.loadQuestion.bind(this));
    }

    setAnswer(i : number) {
    	this.userAnswer = this.answersArray[i];
    	this.noAnswer = false; // flag, that indicates an error if button is clicked without answer
    }

	
/*
=============================== Function that takes 5 random words from dictionary ===============================
*/
	loadQuestion() {
		console.log('Текущая длина словаря: ',this.dictionary.length);

		this.userAnswer = '-'; // '-' mean that there is no answer
		let randomAnswerIndex = Math.floor(Math.random()*5);
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

/*
=============================== Loads new question if click event occurred ===============================
*/
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
		
		this.animateTitleAndText();
		setTimeout(() => this.loadQuestion(), 500);
		setTimeout(() => this.animateTitleAndText(), 600);
	
	}

/*
=============================== Function that starts animation of title and answers text ===============================
*/  
	animateTitleAndText() {
		this.animState = (this.animState === 'visible' ? 'hidden' : 'visible');
	}

}
