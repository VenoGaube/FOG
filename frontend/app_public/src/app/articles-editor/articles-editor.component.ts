import { Component, OnInit } from '@angular/core';
import {conditionallyCreateMapObjectLiteral} from "@angular/compiler/src/render3/view/util";

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
    el = el.parentElement
    console.log(el)
    if(el.children[1].style.maxHeight=="0px")
      el.children[1].style.maxHeight="500px"
    else
      el.children[1].style.maxHeight="0px"
  }

}
