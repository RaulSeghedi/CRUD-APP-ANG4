import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from "./service/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataService) {
  }

  title = 'CRUD APP';
  colName = ['name', 'age'];
  people: any[] = [];
  isEdit: boolean = false;
  person: any;
  sortedType = "asc";

  @ViewChild('name') personName;
  @ViewChild('age') personAge;

  ngOnInit() {
    this.fetchData();

    this.dataService.getLocalData().subscribe(response => {
      console.log(response, "----------------------------");
    })
  }

  sortList() {
    this.sortedType == "asc" ? this.sortedType = "desc" : this.sortedType = "asc";
    this.fetchData()
  }


/*
  fetchData() {
    this.dataService.getData().subscribe(response => {
      this.people = response;
      console.log(response);
    })
  }
*/

  fetchData() {
    this.dataService.getSortedDataByName(this.sortedType).subscribe(response => {
      this.people = response;
    })
  }

  erase() {
    this.dataService.eraseData().subscribe(() => {
      this.people = [];
    })
  }

  addPerson(name, age) {
    let person = {name: name, age: age};
    this.dataService.addData(person).subscribe(response => {
      this.people.push(response);
      this.personName.nativeElement.value = '';
      this.personAge.nativeElement.value = '';
      console.log(response);
    })
  }

  deletePerson(index, id) {
    this.dataService.deleteData(id).subscribe(() => {
      this.people.splice(index, 1);
    })
  }

  updatePerson(index) {
    console.log('update testing ...');
    this.isEdit = true;
    this.person = Object.assign({}, this.people[index]);
  }

  savePerson() {
    console.log('save testing');
    this.dataService.saveUpdatedData(this.person.id, this.person).subscribe(response => {
      this.people.forEach(p => {
        if (p.id == response.id) {
          console.log(response, "RESPONSE");
          p.name = response.name;
          p.age = response.age;
        }
      })
    })
    this.isEdit = false;
  }
}

