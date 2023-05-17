// import { Component, OnInit } from '@angular/core';
// import { SocialService } from 'src/app/Service/social.service';
// import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
// import { MatDialogRef } from '@angular/material/dialog';
// import { ImageModel } from 'src/app/Models/image';
// @Component({
//   selector: 'app-image-temp',
//   templateUrl: './image-temp.component.html',
//   styleUrls: ['./image-temp.component.scss'],
// })
// export class ImageTempComponent implements OnInit {
//   myForm!: FormGroup; 
//   updateForm: FormGroup | undefined;
//   selectedImage: any = null;
//   imgSrc: string = "./assets/click_here.svg"
//   newImage: any;

//   constructor(private socialService: SocialService,
//     private fb: FormBuilder,
//     public dialogRef: MatDialogRef<ImageTempComponent>
//     ) { }

 

//   ngOnInit(): void {
//     this.myForm = this.fb.group({
//       image_url: new FormControl('', [Validators.required]),
//     })
//     this.updateForm = this.fb.group({
//       imgurl: new FormControl('', [Validators.required]),
//     })
//     this.fetchImage()
//   }

//   showPreview(event: any) {
//     if(event.target.files && event.target.files[0]){
//       const reader = new FileReader();
//       reader.onload = (e:any) => this.imgSrc = e.target.result;
//       reader.readAsDataURL(event.target.files[0]);
//       this.selectedImage = event.target.files[0];
     
//     }
//     else {
//       this.imgSrc = 'assets/click_here.svg';
//       this.selectedImage = null;
//     }
//   }


//   onSubmit(Image: { value: string | null; }){

//     console.log(this.selectedImage);

//     const formData: FormData = new FormData();
//     formData.append('image', this.selectedImage, this.selectedImage.name);
//     this.socialService.addProfile(formData).subscribe(
//       data => {
//         Image.value = null;
//         // this.socialService.successToaster('Profile Added Successfully...', 'SUCCESS');
//         console.log('Profile Added Successfully...');
//         this.dialogRef.close('close');
//       }
//     )
//   }

//   get formControls() {
//     return this.myForm.controls;
//   }

//   fetchImage(){
//     this.socialService.getProfile().subscribe((data)=>{
//       this.newImage = data
//       console.log(data)
//     })
//   }
//   updateProfile(id: any,Image: { value: string | null; }){
//     // alert(id);
//     console.log(this.selectedImage.name);
//     const formData: FormData = new FormData();
//     formData.append('image', this.selectedImage, this.selectedImage.name);
//     this.socialService.updateProfile(id,formData).subscribe(
//       data => {
//         Image.value = null;
//         // this.socialService.successToaster('Post Updated Successfully...', 'SUCCESS');
//         this.dialogRef.close('close');
//         console.log('Post Updated Successfully');
//       }
//     )
//   }

// }
