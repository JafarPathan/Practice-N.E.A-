import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.module';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent implements OnInit{
  enteredContent= "";
  enteredTitle= "";
  mode = 'create';
  postId: string;
  post;

  constructor(private postService: PostService, public route: ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode='edit';
        this.postId = paramMap.get('postId');
        this.post = this.postService.getPost(this.postId);

      }else{
        this.mode= 'create';
      }
    })
  }

  onAddPost(form:NgForm){
    if(form.invalid){
      return
    }
    if(this.mode === 'create'){
    this.postService.addPost(form.value.title, form.value.content)
    }else{
      this.postService.updatePost(this.postId, form.value.title, form.value.content)
    }
    form.resetForm();
  }
}
