import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit  {
  postss = "tuka";
  posts=[];

  constructor(private postService: PostService){}

  ngOnInit(){
    this.postService.getposts();
    this.postService.getPostUpdateListener()
      .subscribe((data: any) => {
        this.posts = data;
      })
  }
  onDelete(postId:string){
    console.log(postId)
    this.postService.deletePost(postId)

  }
}
