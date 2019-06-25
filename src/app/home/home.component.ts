import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isClicked = true;

  ngOnInit() {
  }

  onClick() {
    this.isClicked = !this.isClicked;
  }

}
