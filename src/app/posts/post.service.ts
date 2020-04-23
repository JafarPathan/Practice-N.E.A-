import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { Post } from './post.module';

@Injectable({providedIn: 'root'})

export class PostService {
  posts: Post[] = [];
  tuka= [{title: "rrtyy"},{title: "rrtyy"},{title: "rrtyy"},{title: "rrtyy"}];

  private postUpdated = new Subject();

  constructor(private http:HttpClient){

  }
  getposts(){
    this.http.get<any>('http://localhost:3000/api/post')

    /////////////   _id field change to id

    .pipe(map((postData)=> {
      return postData.posts.map(post =>{
        return {
          title: post.title,
          content: post.content,
          id: post._id
        }
      })
    }))
      .subscribe((transformedPost)=>{
        this.posts = transformedPost;
        this.postUpdated.next(this.posts);
        console.log(this.posts)
      })

    ////////////// normal get request
    // .subscribe((postData)=>{
    //   console.log(postData.posts)
    //   this.posts = postData.posts
    //   console.log(this.posts)

    //   this.postUpdated.next([...this.posts])
    // })
  }

  getPost(id: string){
    return {...this.posts.find(p => p.id === id)}
  }

  getPostUpdateListener(){
    return this.postUpdated.asObservable()

  }

  addPost(title: string, content: string){
    const post: any = {id:null, title: title, content: content};
    this.http.post<Post>('http://localhost:3000/api/post', post)
      .subscribe((responeData) =>{
        console.log("message");
        this.posts.push(post)
        console.log(this.posts)
        this.postUpdated.next(this.posts);
        console.log(this.posts)

      })

  }

  updatePost(id: string, title, content){
    const post = {id: id, title: title , content: content};
    this.http.put('http://localhost:3000/api/post/' + id, post)
      .subscribe(response =>{
        console.log(response)
      })
  }

  deletePost(postId:string){
    this.http.delete('http://localhost:3000/api/post/' + postId)
      .subscribe( () => {
        console.log('deleted')
        const updatedPost = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPost;
        this.postUpdated.next(this.posts)
      })
  }
}
