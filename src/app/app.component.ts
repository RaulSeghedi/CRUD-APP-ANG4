import {Component, OnInit} from '@angular/core';
import {DataService} from "./service/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private dataService: DataService){}

  title = 'CRUD APP';
  colName = ['Name', 'Age'];
  people: any[] = [];

  ngOnInit(){
    this.fetchData();
  }

  fetchData(){
    this.dataService.getData().subscribe( response => {
      this.people = response;
      console.log(response);
    })
  }
}
