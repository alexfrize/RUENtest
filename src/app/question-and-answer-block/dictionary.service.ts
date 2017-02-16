import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { IDictionary } from './dictionary.interface';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";


@Injectable()
export class DictionaryService {
  private error: any;
  // private _url: string = 'app/question-and-answer-block/dictionary.json';
  // private _url: string = 'app/question-and-answer-block/small_test_dict.json';
  // private _url: string = 'http://localhost:3000/api/dict';
  private _url: string = '/server/api/dict';
	private dict : IDictionary[];
	constructor(private _http: Http ) { }

  loadDictionary() : Observable<IDictionary[]> {
    return this._http.get(this._url)
    .map((response:Response) => {console.log("DATA1: response.json()\r\n", response.json()); return <IDictionary[]>response.json() })
    .do(data => console.log("DATA from server:\r\n", JSON.stringify(data)));
    // .do(data => console.log("DATA from server:\r\n", JSON.parse(data)));
    // .catch(this.handleError);
	}
  
  handleError(error : Response) : void {
    console.log("ERROR: ", error);
  }
} 