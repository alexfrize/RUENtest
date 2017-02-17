import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { transition, trigger, state, style, animate, keyframes } from '@angular/core';

@Component({
  selector: 'score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css'],
  animations: [
    trigger('resultsAnimation', [
        state('visible', style({
          transform: 'scale3d(1, 1, 1)',
          opacity: 1
        })),
        state('hidden', style({
          transform: 'scale3d(0, 0, 0)',
          opacity: 0
        })),
        transition('visible => hidden', animate('200ms ease-in-out')),
        transition('hidden => visible', animate('250ms ease-in-out'))
     ])
  ]
})

/*
=============================== Main class functions and variables ===============================
*/
export class ScoreTableComponent implements OnInit, OnChanges {
  @Input() questionNumber:number;
  @Input() isAnswerCorrect:boolean;
  private rightAnswers:number = 0;
  private wrongAnswers:number = 0;
  resultsTable:boolean[] = [];

  animState : string = 'visible';

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
  	this.countAnswers();
  }
 
/*
=============================== Function that counts correct and wrong answers ===============================
*/ 
  countAnswers() {
  	if (this.questionNumber > 1) {
      this.animateResults();
      setTimeout(() => {
    	  if (this.isAnswerCorrect) this.rightAnswers++;
    	   else this.wrongAnswers++; 
    	  this.resultsTable.push(this.isAnswerCorrect);
      },300);
      setTimeout(() => this.animateResults(), 400);
  	}
  }

/*
=============================== Function that starts animation of check marks and crosses ===============================
*/   
  animateResults() {
    this.animState = (this.animState === 'visible' ? 'hidden' : 'visible');
  }
}
