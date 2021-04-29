import { Directive, ElementRef, OnInit } from "@angular/core";


@Directive ({
    selector: '[appBasicHighlight]'
})


export class BasicHighlightDirective implements OnInit {
    constructor (private elementr: ElementRef) {

    }


ngOnInit() {
    this.elementr.nativeElement.style.backgroundColor = 'blue';
    this.elementr.nativeElement.style.color='red';
}
}
