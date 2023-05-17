import { Injectable } from '@angular/core';
import { map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostModel } from '../Models/post';
// import Swal from 'sweetalert2/dist/sweetalert2.js';


//ngx-toaster
// import { ToastrService } from 'ngx-toastr';

interface RecordedAudioOutput {
  blob: Blob;
  title: string;
}


@Injectable({
  providedIn: 'root'
})
export class SocialService {
  uri = 'https://infodeltasys.nl/cportal/public/api';
  newPost!: PostModel[]
  authToken: any
  user: any
  private _recordingTime = new Subject<string>();
  private _recorded = new Subject<RecordedAudioOutput>();

  constructor(private http: HttpClient,
    // private toastr: ToastrService
    ) { }


  storeUserData(token: any){
    console.log(token);
    localStorage.setItem('id_token', token);
    this.authToken = token;
  }

  public getToken(){
    return localStorage.getItem('id_token');
  }

  getPost(){
    var token:any=""
    token=localStorage.getItem('id_token')
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', token)
    console.log("vanko",token);

    return this.http.get(`https://infodeltasys.nl/cportal/public/api/auth/allpost`, {headers: {'Content-Type': 'multipart/form-data','Authorization': `Bearer `+token}}).pipe(map((res:any)=>{
      console.log(res);
      
      return res;

    }))
    
  }

  addPost(formData: any): Observable<any>{
    var token:any=""
    token=localStorage.getItem('id_token')
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', token)
    console.log("vanko",token);
    return this.http.post(`https://infodeltasys.nl/cportal/public/api/auth/addpost`, formData,{headers: {'Authorization': `Bearer `+token}}).pipe(map((res:any)=>{
      console.log(res);  return res;
        
        
      }))
  }

  // Admin Post
  getAdminPost(){
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.get(`${this.uri}/auth/adminPost`, {headers: headers})
  }
  

  // Blog post api start

  getblog(){
    const headers = new HttpHeaders()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', `Bearer `)
    return this.http.get(`${this.uri}/auth/blog` , {headers: headers})
  }

  addBlog(formData:any): Observable<any>{

    return this.http.post(`${this.uri}/auth/blog`, formData)
  }

//   getReport(){
//     const headers = new HttpHeaders()
//     headers.append('Content-Type', 'application/json')
//     headers.append('Authorization', `Bearer `)
//   return this.http.get(`${this.uri}/auth/PostReport` , {headers: headers})
//  }

  addReport(id:any, formData:any): Observable<any>{
    return this.http.post(`${this.uri}/auth/save-report/${id}`, formData)
  }


  getBlogComment(id:any){
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.get(`${this.uri}/auth/getblogcomment/${id}`, {headers: headers})
  }

  addBlogComment(id:any, formData:any): Observable<any>{
    return this.http.post(`${this.uri}/auth/blogcomment/${id}`, formData)
  }

  getBlogReply(id:any){
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.get(`${this.uri}/auth/getblogcommentreply/${id}`, {headers: headers})
  }

  addBlogReply(formData:any): Observable<any>{
    return this.http.post(`${this.uri}/auth/blogcommentreplies`, formData)

  }
  addBlogLike(formData:any){
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.post(`${this.uri}/auth/bloglike`, formData)
  }

  // Blog post api end

  // Like Api

  addLike(formData:any){
    const headers = new HttpHeaders()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', `Bearer `)
      return this.http.post(`${this.uri}/auth/like`, formData);
  }

   // Comment fetch and post api

  // getComment(){
  //   const headers = new HttpHeaders()
  //   headers.append('Content-Type', 'application/json')
  //   headers.append('Authorization', `Bearer `)
  //   return this.http.get(`${this.uri}/auth/comment` )
  // }

// Add Comment
  addComment(id:any, formData:any): Observable<any>{
    var token:any=""
    token=localStorage.getItem('id_token')
    return this.http.post(`${this.uri}/auth/save-comment/${id}`, formData, {headers: {'Authorization': `Bearer `+token}})
  }

  // Get Profile Detail
  getProfile(){
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.get(`${this.uri}/auth/profile`, {headers: headers})
  }

  addProfile(formData:any){
    return this.http.post(`${this.uri}/auth/addprofile`, formData)
  }

  // Get Users Detail
  getUsers(){
    var token:any=""
    token=localStorage.getItem('id_token')
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer`+token)
    return this.http.get(`https://infodeltasys.nl/cportal/public/api/auth/userlist`, {headers: {'Content-Type': 'application/json','Authorization': `Bearer `+token}})
  }
  getComment(id:any){
    var token:any=""
    token=localStorage.getItem('id_token')
    return this.http.get(`https://infodeltasys.nl/cportal/public/api/auth/getcomment/${id}`, {headers: {'Authorization': `Bearer `+token}})
 
  }
  getLike(id: any){
    var token:any=""
    token=localStorage.getItem('id_token')

    return this.http.get(`${this.uri}/auth/getlike/${id}`, {headers: {'Authorization': `Bearer `+token}})
  }
  addFriends(formData:any){
    var token:any=""
    token=localStorage.getItem('id_token')
    return this.http.post(`${this.uri}/auth/addfriend`, formData, {headers: {'Authorization': `Bearer `+token}})
  }

   // Get All Friend Request
   getFriendRequest(){
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.get(`${this.uri}/auth/friend-request`, {headers: headers})
  }

   // Get All Friends
   getFriends(){
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.get(`${this.uri}/auth/friend`, {headers: headers})
  }

  addReply(FormData:any){
    return this.http.post(`${this.uri}/auth/commentreplies`, FormData)
  }

//   showReplies(id){
// this. getReplies(id);
//   }

   // Get All Friends
   getReplies(post_id:any){
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.get(`${this.uri}/auth/commentreplies/${post_id}`, {headers: headers})
  }

  acceptFriend(formData:any){
    return this.http.post(`${this.uri}/auth/friend-request-accept`, formData)
  }

  postSharePost(FormData:any){
    return this.http.post(`${this.uri}/auth/postshare`, FormData)
  }

    // Get All Friends
  getSharePost(){
      const headers = new HttpHeaders()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', `Bearer `)
      return this.http.get(`${this.uri}/auth/postshare`, {headers: headers})
    }

     /* Api's of post stories */

     getStories(){
      const headers = new HttpHeaders()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', `Bearer `)
      return this.http.get(`${this.uri}/auth/poststory`, {headers: headers})

    }

    addStory(formData:any){
      return this.http.post(`${this.uri}/auth/poststory`, formData)
    }

       /* Api's of post reels */
    
    getReels(){
      const headers = new HttpHeaders()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', `Bearer `)
      return this.http.get(`${this.uri}/auth/postreels`, {headers: headers})
    }

    addReels(formData: any){
      return this.http.post(`${this.uri}/auth/postreels`, formData)
    }

    // Voice record in post


    // Success Messages
    alertSuccess(message:any){
      // Swal.fire({
      //     title: 'Whooa!',
      //     text: message,
      //     icon: 'success'
      //    })
      //   .then((result:any) => {
      //     if (result.value) {
      //       window.location.reload();
      //     }
      //   });
        alert('Oops...'+ message);

        //window.location.reload();
    }

//Error box
    alertError(message:any){
    alert('Oops...'+ message);
    }



    // block friend
    blockUnblock(id:any,formData:any): Observable<any>{
      return this.http.post(`${this.uri}/auth/block/${id}`, formData)
    }

   

    getReply(id:any){
      const headers = new HttpHeaders()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', `Bearer`)
      return this.http.get(`${this.uri}/auth/getcommentreply/${id}`, { headers: headers })
    }

  updateProfile(id: any,formData: any){
    return this.http.post(`${this.uri}/auth/profile/${id}`, formData);
  }

 

   getDOB() {
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.get(`${this.uri}/auth/birthday`, { headers: headers })
  }

  getBlockedUsers() {
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.get(`${this.uri}/auth/block`, { headers: headers })
  }

  getLiveStory(){
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.get(`https://infodeltasys.nl/cportal/public/api/auth/live-story`, { headers: headers })
  }

  // successToaster(message: string | undefined, title: string | undefined){
  //   this.toastr.success(message, title ,{
  //     timeOut :  3000,

  //   })

  // }

  addCoverPhoto(formData: any){
    return this.http.post(`${this.uri}/auth/coverphoto`, formData)
  }

  getCoverPhoto(){
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.get(`${this.uri}/auth/coverphoto`, {headers: headers})

  }
  editCoverPhoto(id: any,formData: any){
    return this.http.post(`${this.uri}/auth/coverphoto/${id}`, formData)
  }

  addReplyReplies(FormData: any){
    return this.http.post(`${this.uri}/auth/replyofreplies`, FormData)
  }

  getReplyReplies(){
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.get(`${this.uri}/auth/replyofreplies`, {headers: headers})
  }

  addReplyLikes(FormData: any){
    return this.http.post(`${this.uri}/auth/replylike`, FormData)
  }

  getReplyLikes(){
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.get(`${this.uri}/auth/replylike`, {headers: headers})
  }

  addLiveComment(FormData: any){
    return this.http.post(`${this.uri}/auth/livestreamcomment`, FormData)
  }

  getLiveComment(){
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.get(`${this.uri}/auth/livestreamcomment`, {headers: headers})
  }

  addNotification(FormData: any){
    var token:any=""
    token=localStorage.getItem('id_token')
    return this.http.post(`${this.uri}/auth/notification`, FormData,{headers: {'Authorization': `Bearer `+token}})
  }

  getNotification(){
    var token:any=""
    token=localStorage.getItem('id_token')
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', token)
    console.log("vanko",token);
    return this.http.get(`https://infodeltasys.nl/cportal/public/api/auth/notification`,{headers: {'Content-Type': 'application/json','Authorization': `Bearer `+token}})
  }

  getAdminNotification(){
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.get(`${this.uri}/auth/adminNotification`, {headers: headers})
  }

  addAdminNotification(FormData: any){
    return this.http.post(`${this.uri}/adminNotification`, FormData)
  }

  unread(){
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.get(`${this.uri}/auth/unread`, {headers: headers})
  }

  markAsRead(FormData: any){
    return this.http.post(`${this.uri}/auth/read`, FormData)
  }

  editPost(post_id: any){
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.get(`${this.uri}/auth/getPostById/${post_id}`, {headers: headers})
  }

  //update post
  updatePost(formData: any,id: any): Observable<any>{
    return this.http.post(`${this.uri}/auth/updatePost/${id}`, formData);
  }

  deletePost(id: any): Observable<any>{
    return this.http.delete(`${this.uri}/auth/deletePost/${id}`);
  }

  updateProfileStatus(formdata: any): Observable<any>{
    return this.http.post(`${this.uri}/auth/update_profile_status`,formdata);
  }

  getPublicPost(){
    var token:any=""
    token=localStorage.getItem('id_token')
    return this.http.get(`https://infodeltasys.nl/cportal/public/api/auth/get_public_post`, {headers: {'Content-Type': 'multipart/form-data','Authorization': `Bearer `+token}}).pipe(map((res:any)=>{
      console.log(res);
      
      return res;

    }))
  }

  getRecordedTime(): Observable<string> {
    return this._recordingTime.asObservable();
  }

  getRecordedBlob(): Observable<RecordedAudioOutput> {
    return this._recorded.asObservable();
  }

  getsuggestion(){
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.get(`${this.uri}/auth/suggestion`, {headers: headers})
  }

}
