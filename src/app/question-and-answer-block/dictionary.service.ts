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
	private dict : IDictionary[];
	constructor(private _http: Http ) { }

  loadDictionary() : Observable<IDictionary[]> {
    return this._http.get('app/question-and-answer-block/dictionary.json')
    .map((response:Response) => <IDictionary[]>response.json())
    .do(data => console.log(JSON.stringify(data)));
    // .catch(this.handleError);
	}
  
  handleError(error : Response) : void {
    console.log("ERROR: ", error);
  }

/*
  getProducts(): Observable <IProductInterface[]> {
    return this._http.get(this._url)
    .map ((response : Response) => <IProductInterface[]>response.json())
    .do(data => console.log(JSON.stringify(data)))
    .catch(this.handleError);

  }
*/

} 