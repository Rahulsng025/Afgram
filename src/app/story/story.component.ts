import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  data = [
    {title: 'Story 1', description: 'This is card 1', image: 'https://www.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg'},
    {title: 'Story 2', description: 'This is card 2', image: 'https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg'},
    {title: 'Story 3', description: 'This is card 3', image: 'https://i.pcmag.com/imagery/articles/00Cx7vFIetxCuKxQeqPf8mi-23..v1643131202.jpg'},
    {title: 'Story 4', description: 'This is card 1', image: 'https://www.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg'},
    {title: 'Story 5', description: 'This is card 2', image: 'https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg'},
    {title: 'Story 6', description: 'This is card 3', image: 'https://i.pcmag.com/imagery/articles/00Cx7vFIetxCuKxQeqPf8mi-23..v1643131202.jpg'}
  ];
  sampleData = [
    {
      name: 'Item 1',
      description: 'This is the first item',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Item 2',
      description: 'This is the second item',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Item 1',
      description: 'This is the first item',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Item 2',
      description: 'This is the second item',
      image: 'https://via.placeholder.com/150'
    },{
      name: 'Item 1',
      description: 'This is the first item',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Item 2',
      description: 'This is the second item',
      image: 'https://via.placeholder.com/150'
    },
    // more items
  ];

}
