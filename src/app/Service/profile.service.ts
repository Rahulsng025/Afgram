import { Injectable } from '@angular/core';
import { ProfileModel } from '../Models/profile';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  uri="https://infodeltasys.nl/cportal/public/api/auth"
  newProfile: ProfileModel[] | undefined

  constructor(private http: HttpClient) { }

  // Api's of Add-Profile component

  getProfile(){
    var token:any=""
    token=localStorage.getItem('id_token')
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', token)
    console.log("vanko",token);

    return this.http.get(`https://infodeltasys.nl/cportal/public/api/auth/profile`, {headers: {'Content-Type': 'application/json','Authorization': `Bearer `+token}}).pipe(map((res:any)=>{
      console.log(res);
      
      return res;

    }))
    
  }
  getCoverPhoto(){
    var token:any=""
    token=localStorage.getItem('id_token')
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', token)
    console.log("vanko",token);

    return this.http.get(`https://infodeltasys.nl/cportal/public/api/auth/coverphoto`, {headers: {'Content-Type': 'multipart/form-data','Authorization': `Bearer `+token}}).pipe(map((res:any)=>{
      console.log(res);
      
      return res;

    }))
    
  }

  addProfile(data: any){
    var token:any=""
    token=localStorage.getItem('id_token')
    return this.http.post(`https://infodeltasys.nl/cportal/public/api/auth/addprofile`, data,{headers: {'Authorization': `Bearer `+token}}).pipe(map((res:any)=>{
      console.log(res);  return res;
        
        
      }))
  }


  updateProfile(data: any, id: any){
    console.log(id,data);
    
    var token:any=""
    token=localStorage.getItem('id_token')
    return this.http.post(`https://infodeltasys.nl/cportal/public/api/auth/profile/${id}`, data,{headers: {'Authorization': `Bearer `+token}}).pipe(map((res:any)=>{
    console.log(res);  return res;
      
      
    }))
  }

  addCoverImage(data: any){
    var token:any=""
    token=localStorage.getItem('id_token')
    return this.http.post(`https://infodeltasys.nl/cportal/public/api/auth/coverphoto`, data,{headers: {'Authorization': `Bearer `+token}}).pipe(map((res:any)=>{
      console.log(res);  return res;
        
        
      }))
  }
  updateCoverImage(data: any, id: any){
    console.log(id,data);
    
    var token:any=""
    token=localStorage.getItem('id_token')
    return this.http.post(`https://infodeltasys.nl/cportal/public/api/auth/coverphoto/${id}`, data,{headers: {'Authorization': `Bearer `+token}}).pipe(map((res:any)=>{
    console.log(res);  return res;
      
      
    }))
  }
  getPost(){
    var token:any=""
    token=localStorage.getItem('id_token')
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', token)
    console.log("vanko",token);

    return this.http.get(`https://infodeltasys.nl/cportal/public/api/auth/post`, {headers: {'Content-Type': 'multipart/form-data','Authorization': `Bearer `+token}}).pipe(map((res:any)=>{
      console.log(res);
      
      return res;

    }))
    
  }

  // Api's of about profile component

  getaboutDetails(){
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer `)
    return this.http.get(`${this.uri}/auth/about`, {headers: headers})
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  addAboutDetails(data: any){
    return this.http.post(`${this.uri}/auth/about`, data).pipe(map((res:any)=>{
      return res;
    }))
  }

  updateAboutDetails(data: any, id: any){
    return this.http.put<any>(`${this.uri}/auth/about/${id}`, data).pipe(map((res)=>{
      return res;
    }))
  }


  addPost(data: any){
    return this.http.post(`${this.uri}/auth/profiledetails`, data).
    pipe(map((res:any)=>{
      return res;
    }))
  }


}
