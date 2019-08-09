import { Data } from '@angular/router';

export class Tree{

    text:String;
    nodes:Tree[];

    constructor(text: string, nodes:Tree[]) {
         this.text = text; 
         this.nodes= nodes;
        }

}