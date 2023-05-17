import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { SocialService } from 'src/app/Service/social.service';
import { ProfileService } from 'src/app/Service/profile.service';
import * as $ from 'jquery';
import { IonModal } from '@ionic/angular';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  newPost: any;
  newComment: any;
  post_id: any;
  newReply: any;
  comm_id: any;
  replyComment: any;
  newImage: any;
  isReadMore = true;
  likes: Object;
  selectedFile: null;
  imagePreview: string;
  textFieldData: any;
  previewImage: string;
  presentingElement: Element | null;

  constructor(    public socialService: SocialService,
    private profileService: ProfileService,

    ) { }

  ngOnInit() {
    this.fetchImage(),
    this.fetchProfile()

  }
  @ViewChild(IonModal) modal: IonModal;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  images = [
    { src: 'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', alt: 'image 1' },
    { src: 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg', alt: 'image 2' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuUloBtEx4fZuLGihG5oJEtYFHvar6pVoeB-uzquGKLvghx_yvE-NPFw317g-yd2aZHpk&usqp=CAU', alt: 'image 3' }
  ];
  fetchImage(){
    
    this.socialService.getPublicPost().subscribe(res => {
      console.log(res); 
      this.newPost=res
      this.newPost = res.slice().reverse();
      console.log(this.newPost);
      
      return res
   })
  }
  fetchProfile() {
    this.profileService.getProfile().subscribe((res) => {
      console.log(res);
      this.newImage = res;
     

      return res;
    });
  }
  URLReplacer(str: string) {
    //console.log(str);
    if (str) {
      let match = str.match(
        /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
      );
      if (match != null) {
        return true;
      } else {
        return false;
      }
    }
    else{
      return false;
    }
  }
  showText() {
    this.isReadMore = !this.isReadMore;
  }
  showLikeModal(post_id: any) {
    // alert(post_id);
    this.socialService.getLike(post_id).subscribe((data) => {
      this.likes = data;
      // console.log(data)
    });
    // (<any> $('#likeModal')).modal('show');
  }

  showModal(){
    // $('#exampleModalLong').modal('show');
    (<any>$('#commentModal')).modal('show');

  }
  closeModal(){
    // $('#exampleModalLong').modal('show');
   
  }
  getComments(id: any){
    
    this.socialService.getComment(id).subscribe(res => {
      console.log(res); 
      this.newComment=res
      
      return res
   })
  }
  showCommentModal(post_id: any){
    this.post_id=post_id;
    this.socialService.getComment(post_id).subscribe((data)=>{
          this.newComment = data;
          // console.log(data)
        })
    // $('#commentModal').modal('show');
    this.showModal()
  }
  closeCommentModal(){
    (<any>$('#commentModal')).modal('hide');

  }
  closeReplyModal() {
    (<any>$('#replyModal')).modal('hide');
  }
  showReplyModal(comm_id: any) {
    // alert(comm_id);
    this.comm_id=comm_id;
    this.socialService.getReply(comm_id).subscribe((data)=>{
          this.newReply = data;
          this.replyComment=this.newReply[0].comment;
          // console.log(data)
        });
        (<any>$('#replyModal')).modal('show');
  }

  onFileSelected(event: any) {
    this.selectedFile = null;
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    if (this.selectedFile != null) {
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
