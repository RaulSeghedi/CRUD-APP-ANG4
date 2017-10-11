import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http: Http) {
  }

  getData() {
    return this.http.get('http://localhost:3000')
      .map(response => response.json());
  }

  eraseData() {
    return this.http.get('http://localhost:3000/erase')
  }

  addData(body) {
    return this.http.post('http://localhost:3000', body)
      .map(response => response.json());
  }

  deleteData(id) {
    return this.http.delete("http://localhost:3000/" + id)
      .map(response => response.json());
  }

  saveUpdatedData(id, body) {
    return this.http.put("http://localhost:3000/" + id, body)
      .map(response => response.json());
  }

  getSortedDataByName(sortedType) {
    return this.http.get("http://localhost:3000/sorted/" + sortedType)
      .map(response=>response.json());
  }

  getLocalData() {
    return this.http.get('/assets/json.json')
      .map(response => response.json());
  }
}
