import { Component, OnInit } from '@angular/core';
import { StoryComponent } from '../story/story.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.notification()
  }
  data = [  {title: 'Card 1', description: 'This is card 1'},  {title: 'Card 2', description: 'This is card 2'},  {title: 'Card 3', description: 'This is card 3'}];




  notification(){
    // this.router.navigate(['/tabs/tab4']);
    // console.log("/notification");
    
  }
}

