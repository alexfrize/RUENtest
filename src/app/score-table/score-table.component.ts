import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css']
})
export class ScoreTableComponent implements OnInit, OnChanges {
  @Input() questionNumber:number;
  @Input() isAnswerCorrect:boolean;
  private rightAnswers:number = 0;
  private wrongAnswers:number = 0;
  resultsTable:boolean[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
  	this.countAnswers();
  }
  
  countAnswers() {
  	if (this.questionNumber > 1) {
  	  if (this.isAnswerCorrect) this.rightAnswers++;
  	   else this.wrongAnswers++; 
  	  this.resultsTable.push(this.isAnswerCorrect);
  	}
  }

}
