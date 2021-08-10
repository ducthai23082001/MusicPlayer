import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular';
  students;
  student;
  constructor(private http: HttpClient){

  }
  ngOnInit(){
    this.getStudent();
  }

  getStudent(){
    this.http.get("https://localhost:5001/api/student").subscribe(result => {
      this.students = result;
      this.student = this.students[0]
      console.log(this.students)
    })
  }
}
