import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

import { Post } from './post.module';

@Injectable({providedIn: 'root'})

export class PostService {
  posts: Post[] = [];
  tuka= [{title: "rrtyy"},{title: "rrtyy"},{title: "rrtyy"},{title: "rrtyy"}];

  private postUpdated = new Subject();

  constructor(private http:HttpClient, private router: Router){

  }
  getposts(){
    this.http.get<any>('http://localhost:3000/api/post')

    /////////////   _id field change to id

    .pipe(map((postData)=> {
      return postData.posts.map(post =>{
        return {
          title: post.title,
          content: post.content,
          id: post._id,
          imagePath: post.imagePath
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
    return this.http.get<any>('http://localhost:3000/api/post/' + id)
  }

  getPostUpdateListener(){
    return this.postUpdated.asObservable()

  }

  addPost(title: string, content: string, image: File){
    const postData = new FormData();
    postData.append("title", title)
    postData.append("content", content)
    postData.append("image", image)
    this.http.post<Post>('http://localhost:3000/api/post', postData)
      .subscribe((responeData) =>{
        const post :Post = {
          id: responeData.id,
          title: title,
          content:content,
          imagePath: responeData.imagePath
        }
        this.posts.push(post)
        console.log(this.posts)
        this.postUpdated.next(this.posts);
        console.log(this.posts)
        this.router.navigate(["/"]);
      })

  }

  updatePost(id: string, title: string, content: string, image: any){
    let postData;
    if (typeof(image) === 'object' ){
      console.log(typeof(image))
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);

    }else{
      console.log(typeof(image))
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      };
    }

    this.http.put<any>('http://localhost:3000/api/post/' + id, postData)
      .subscribe(response =>{
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === id)
        const post = {
          id: id,
        title: title,
        content: content,
        imagePath: image
        }
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postUpdated.next(this.posts)
        this.router.navigate(["/"]);
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
