import { Component, OnInit } from '@angular/core';
import { SocialService } from '../Service/social.service';
import { ProfileService } from 'src/app/Service/profile.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.page.html',
  styleUrls: ['./all-users.page.scss'],
})
export class AllUsersPage implements OnInit {
  suggestedUsers: any
  frd_request: any;
  requestCount = 0;
  newImage: any;
  myProfile: any;

  users: any;
  data: any;
 
  parsedUrl: any;
  friends: any;
  user_id: any;
  supportLanguages = ['en', 'pashto', 'farsi', 'urdu', 'uz'];


  constructor(    private socialService: SocialService,
    private profileService: ProfileService
    ) { }

  ngOnInit() {
    this.fetchAllUsers(),
    this.fetchImage()
  }
  fetchImage() {
    this.profileService.getProfile().subscribe((res) => {
      console.log(res);
      this.myProfile = res;
      

      return res;
    });
  }
  fetchAllUsers() {
    this.socialService.getUsers().subscribe((data) => {
      this.users = data;
      this.user_id = this.newImage.id;
      this.friendRequest(this.user_id);
    });
  }
  getSuggestionList(){
    this.socialService.getsuggestion().subscribe((data) =>{
      this.suggestedUsers = data;
      console.log('Suggested users list', data)
    })
  }
 
  friendRequest(user_id: any) {
    this.socialService.getFriendRequest().subscribe((data) => {
      this.frd_request = data;
      console.log("Friend requested data", data);
      this.frd_request = this.frd_request.filter((element:any) => {
        if (element.user_id_2 == user_id) {
          return true;
        }
        return false;
      });
      console.log(this.frd_request);
    });
  }
  acceptFriend(id:any) {
    const formData = new FormData();
    formData.append('friend_id', id);
    this.socialService.acceptFriend(formData).subscribe((data: any) => {

      // this.socialService.successToaster(
      //   'Friend request accepted successfully',
      //   'SUCCESS'
      // );
      this.friendRequest(this.newImage.id);
      
    });
  }
  addFriend(id:any) {
    const formData: FormData = new FormData();
    formData.append('user_id_2', id);
    this.socialService.addFriends(formData).subscribe((data) => {
      this.data = data;
      console.log('Friend request data',data)
      if (this.data.status) {
        formData.append(
          'message',
          `You have Get 1 Request Of ${this.myProfile.name}`
        );
        this.socialService
          .addNotification(formData)
          .toPromise()
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // this.socialService.successToaster(
      //   'Send Request Successfully.',
      //   'SUCCESS'
      // );

      // console.log('Send Request Successfully.');
    });
  }
}
