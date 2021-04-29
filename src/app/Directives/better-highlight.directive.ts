import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Host } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
  
  constructor(private elRef:ElementRef, private renderer: Renderer2) { }


ngOnInit(){
  //this.renderer.setStyle (this.elRef.nativeElement, 'background-color', 'yellow' );
  //this.renderer.setStyle (this.elRef.nativeElement, 'color', 'orange' );
}
@HostBinding('style.backgroundColor') backgroundColor:string = 'grey';
@HostBinding('style.color') color:string = 'yellow';

@HostListener('mouseenter') mouseover(eventData: Event){
  this.backgroundColor = 'blue';
  this.color='orange';
  //this.renderer.setStyle (this.elRef.nativeElement, 'color', 'red' );


}

@HostListener('mouseleave') mouseleave(eventData: Event){
  //this.renderer.setStyle (this.elRef.nativeElement, 'color', 'black' );
  this.backgroundColor = 'grey';
  this.color = 'yellow';

}


}