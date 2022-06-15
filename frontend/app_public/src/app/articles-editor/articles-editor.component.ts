import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles-editor',
  templateUrl: './articles-editor.component.html',
  styleUrls: ['./articles-editor.component.css']
})
export class ArticlesEditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onclick(el:any):void {
    el = el as Element
    console.log(el.attributes.id)
  }

}
