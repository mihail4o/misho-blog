import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  imagePath = 'https://res.cloudinary.com/balivo/image/upload/c_fill,g_auto,f_auto,q_auto,w_150/v1558058145/misho_pics/mmihov_b9ldfe';

  constructor() { }

  ngOnInit() {
  }

}
