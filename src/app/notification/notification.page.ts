import { Component, OnInit } from '@angular/core';
import { SocialService } from 'src/app/Service/social.service';
import { AuthenticateService } from 'src/app/Service/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit{
  newImage: any;
  users: any;
  data: any;
  frd_request: any;
  requestCount = 0;
  parsedUrl: any;
  friends: any;

  supportLanguages = ['en', 'pashto', 'farsi', 'urdu','uz'];
  storedTheme: string = localStorage.getItem('theme-color') || '{}';
  notification: any;
  constructor(private router: Router,
    private socialService: SocialService,
    private authService: AuthenticateService,
   ) { }


  ngOnInit(): void {
    this.getUsers();
    this.friendRequest();
    this. fetchImage();
    this.getFriends();
    this.getNotification();
  }

 

  getUsers(){
    this.socialService.getUsers().subscribe((data)=>{
      this.users = data;
      console.log(data);
    })
  }

  friendRequest(){

    this.socialService.getFriendRequest().subscribe((data)=>{
      this.frd_request = data;
      console.log(data);
    })
  }



  addFriend(id: any){
    //alert(id);
    const formData: FormData = new FormData();
    formData.append('user_id_2', id);
        this.socialService.addFriends(formData).subscribe((data)=>{
      this.data = data;
      if(this.data.status){
        formData.append('message',`You have Get 1 Request Of ${this.newImage.name}`);
        this.socialService.addNotification(formData).toPromise().then(res=>{
          console.log(res);
        }).catch(err=>{
          console.log(err);
        })
      }
      // this.socialService.successToaster('Send Request Successfully.','SUCCESS');

      console.log('Send Request Successfully.');
    })
  }

  acceptFriend(id:any){
    // alert(id);
    const formData = new FormData();
    formData.append('friend_id', id);
    this.socialService.acceptFriend(formData).subscribe((data)=>{
      console.log( data);
      this.socialService.alertSuccess('Friend request accepted successfully')

    })
  }

  getNotification(){
    this.socialService.getNotification().subscribe((data)=>{
      this.notification = data;
      console.log(data);
    })
  }


  allUser(){
    this.router.navigate(['all-users']);
  }

  fetchImage(){
    this.socialService.getProfile().subscribe((data)=> {
      this.newImage = data
      console.log(data);
    })
  }

  getFriends(){
    this.socialService.getFriends().subscribe((data)=>{
      this.friends = data;
      console.log(data);
    })
  }

  chat(profile:any,user_name:any,friend_id:any){
    // alert('Chat With '+friend_id);
    this.router.navigate([`chatroom/${friend_id}`, {friend_id,profile,user_name}]);
  }


  onLogout() {
    this.authService.SignOut();
    this.authService.logOut();
  }
  showDiv = {
    previous : false,

  }

  onProfileView() {
    this.router.navigate(['my-profile']);
  }

  onWebCam(){
    this.router.navigate(['preview-video']);
  }

  onPrivacyView(){
    this.router.navigate(['privacy']);

  }
  setTheme() {
    if (this.storedTheme === 'theme-dark') {
      localStorage.setItem('theme-color', 'theme-light');
      this.storedTheme = localStorage.getItem('theme-color') || '{}';

    }
    else {
      localStorage.setItem('theme-color', 'theme-dark');
      this.storedTheme = localStorage.getItem('theme-color') || '{}';
    }
  }

  findFriendId(user_id:any){
    var frd_list=this.friends;
    if(frd_list.find((elem:any) => elem.id === user_id)){
      return true;
    }
    else{
      return false;
    }
  }

}
