import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialService } from 'src/app/Service/social.service';
import { AuthService } from 'src/app/Service/auth.service';
import { AuthenticateService } from 'src/app/Service/authenticate.service';
import { ProfileService } from 'src/app/Service/profile.service';
import { ProfileModel } from 'src/app/Models/profile';
declare var $: any;
import { ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  selectedFile: File | null = null;
  selectedFileCamera: File | null = null;
image:String
  newImage: any = null;
  profile_id: any;
  newProfile: ProfileModel = new ProfileModel();
  posts: any;
  post: any;
  friends: any;
  imageData: any;
  myForm: FormGroup | undefined;
  profileData: any;
  aboutData: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  selectedImage: any = null;
  imgSrc: string = './assets/click_here.svg';
  formData!: FormGroup;
  requestCount = 0;
  frd_request: any;
  parsedUrl: any;

  supportLanguages = ['en', 'pashto', 'farsi', 'urdu', 'uz'];
  birthday: any;
  birthDate: any;
  AddBirthday: FormGroup | undefined;
  current_date: Date | undefined;
  myDate: any;
  msg: boolean | undefined;
  postImage: any;
  coverPhoto: any;
  likes: any;
  post_id: any;
  newComment: any;
  comm_id: any;
  newReply: any;
  replyComment: any;
  selectedReplyImage: any;
  selectedReplyReplyImage: any;
  replyForm!: FormGroup;
  formTemplate!: FormGroup;
  message = '';
  comment = '';
  emoji: string = '';
  reply: any;
  replyReply: any;
  replyLikes: any;
  replyofReply: any;
  repliesReply!: FormGroup;
  previewImage: string| null;
  modalController: any;
  coverImage: any = null;
  imagePreview: string| null;
  presentingElement: Element | null;
  textFieldData: any;
  newPost: any= null;
  imageUrl: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    public socialService: SocialService,
    private profileService: ProfileService,
    private _authService: AuthService,
    private authService: AuthenticateService,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
  ) {
    this.parsedUrl = new URL(window.location.href);
  }

  ngOnInit() {
    this.fetchImage(), this.fetchPost();
    this.fetchCoverImage(),
      this.fetchAllUsers(),
      (this.presentingElement = document.querySelector('.ion-page')),
      this.http
        .get('https://jsonplaceholder.typicode.com/posts')
        .subscribe((data) => {
          this.newImage = data;
        });
  }
  onScroll(event: { scrollTop: number; }) {
    if (event.scrollTop === 0) {
      window.location.reload();
    }
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
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 5000,
      cssClass: 'custom-loading',
    });

    loading.present();
  }
  clearSelectedFile() {
    this.selectedFileCamera = null;
    this.previewImage = '';
  }
  fetchImage() {
    this.profileService.getProfile().subscribe((res) => {
      console.log(res);
      this.newImage = res;
      this.profile_id = res.profile.id;
      console.log(this.profile_id);

      return res;
    });
  }
  fetchCoverImage() {
    this.profileService.getCoverPhoto().subscribe((res) => {
      console.log(res);
      this.coverImage = res;

      return res;
    });
  }
  fetchAllUsers() {
    this.socialService.getUsers().subscribe((res) => {
      console.log(res);
      this.friends = res;
      return res;
    });
  }
  fetchPost() {
    this.profileService.getPost().subscribe((res) => {
      console.log(res);
      this.newPost = res;

      console.log(this.newPost);

      return res;
    });
  }
  addProfileImage() {
    if (this.selectedFileCamera != null) {
      this.showLoading();
      const formData = new FormData();
console.log("hello");

      formData.append('image', this.selectedFileCamera, this.selectedFileCamera.name);

      this.profileService.addProfile(formData).subscribe((res) => {
          console.log(res);
          if (res) {
            this.navigate();
          }
          if (res.type === HttpEventType.UploadProgress) {
            console.log(
              'Upload progress: ' +
                Math.round((res.loaded / res.total) * 100) +
                '%'
            );
          } else if (res.type === HttpEventType.Response) {
            console.log(res.body);
          }

          return res;
        });
    }
  }
  editProfileImage() {
    const formData = new FormData();
    if (this.selectedFileCamera != null) {
      this.showLoading();
      formData.append('image', this.selectedFileCamera, this.selectedFileCamera.name);
      console.log(this.profile_id);

      this.profileService
        .updateProfile(formData, this.profile_id)
        .subscribe((res) => {
          console.log(res);
          if (res) {
            this.navigate();
          }
          if (res.type === HttpEventType.UploadProgress) {
            console.log(
              'Upload progress: ' +
                Math.round((res.loaded / res.total) * 100) +
                '%'
            );
          } else if (res.type === HttpEventType.Response) {
            console.log(res.body);
          }
          // console.log(res);
          // this.newImage=res

          return res;
        });
    }
  }
  addCoverImage() {
    const formData = new FormData();
    if (this.selectedFileCamera != null) {
      this.showLoading();
      formData.append('image', this.selectedFileCamera, this.selectedFileCamera.name);
      console.log(this.profile_id);

      this.profileService.addCoverImage(formData).subscribe((res) => {
        console.log(res);
        if (res) {
          this.navigate();
        }
        if (res.type === HttpEventType.UploadProgress) {
          console.log(
            'Upload progress: ' +
              Math.round((res.loaded / res.total) * 100) +
              '%'
          );
        } else if (res.type === HttpEventType.Response) {
          console.log(res.body);
        }

        return res;
      });
    }
  }
  updateCoverImage() {
    const formData = new FormData();
    if (this.selectedFileCamera != null) {
      this.showLoading();
      formData.append('image', this.selectedFileCamera,  this.selectedFileCamera.name);
      console.log(this.profile_id);

      this.profileService
        .updateCoverImage(formData, this.coverImage.id)
        .subscribe((res) => {
          console.log(res);
          if (res) {
            this.navigate();
          }
          if (res.type === HttpEventType.UploadProgress) {
            console.log(
              'Upload progress: ' +
                Math.round((res.loaded / res.total) * 100) +
                '%'
            );
          } else if (res.type === HttpEventType.Response) {
            console.log(res.body);
          }

          return res;
        });
    }
  }
  addPost() {
    const formData = new FormData();
    if (this.selectedFileCamera != null || this.textFieldData != null) {
      // this.showLoading();
      if (this.selectedFileCamera != null) {
        formData.append('image', this.selectedFileCamera, this.selectedFileCamera.name);
      }
      formData.append('caption', this.textFieldData);
      console.log(this.profile_id);

      this.socialService.addPost(formData).subscribe((res) => {
        console.log(res);
        if (res) {
          this.navigate();
        }
        if (res.type === HttpEventType.UploadProgress) {
          console.log(
            'Upload progress: ' +
              Math.round((res.loaded / res.total) * 100) +
              '%'
          );
        } else if (res.type === HttpEventType.Response) {
          console.log(res.body);
        }

        return res;
      });
    }
  }

  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonModal) modal1: IonModal;

  //  this.message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;
  name1: string;
  cancel1() {
    this.modal1.dismiss(null, 'cancel');
  }

  confirm1() {
    console.log('fu');

    this.modal1.dismiss();
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.clearSelectedFile();
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.clearSelectedFile();
  }

  onWillDismiss(event: Event) {
    // ImageTempComponent
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  onWillDismiss1(event: Event) {
    // ImageTempComponent
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  selectImage(event: any) {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
  }

  uploadImage() {
    this.modalController.dismiss({ image: this.selectedImage });
  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = 'assets/click_here.svg';
      this.selectedImage = null;
    }
  }

  navigate() {
    this.clearSelectedFile();
    window.location.href = '/tabs/profile';
    window.location.reload();
    setTimeout(() => {
      this.router.navigateByUrl(`/tabs/profile`);
    }, 500)
          this.router.navigateByUrl(`/tabs/profile`);
    }

  onCommentPost(post_id: any) {
    // alert(this.post_id);
    this.message=this.formTemplate.value.comment;
    const formData: FormData = new FormData();
    if(this.selectedImage!=null){
      formData.append('image', this.selectedImage, this.selectedImage.name);
      //alert(this.selectedImage.name);
    // console.log(this.selectedImage);
  
    }
    if(this.message!=null){
      formData.append('comment', this.message);
    }
  
    this.socialService.addComment(post_id, formData).subscribe(
      data => {
        console.log('Comment added successfully');
        // this.socialService.successToaster('Comment Addedd Successfully..','Success');
        this.formTemplate.reset();
        this.fetchPost();
      })
  
  }

  
async takePicture() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });

  if (image != null && image.webPath != null) {
    this.imageUrl = image.webPath
    const file = await this.getFileFromUri(image.webPath);
    this.selectedFileCamera = file;
    console.log(this.selectedFileCamera);
    // ...
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFileCamera);
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
  } else {
    console.log("No image selected");
  }
}

async getFileFromUri(uri: string): Promise<File> {
  const response = await fetch(uri);
  const blob = await response.blob();
  return new File([blob], "image.jpeg", { type: "image/jpeg" });
}
  

}
