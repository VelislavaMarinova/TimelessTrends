import { Directive, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
    selector: '[closeMenu]'
})
export class DropdownDirective {
  @Input('closeMenu') isMenuOpen: boolean = true;

  constructor(private renderer: Renderer2) {}
  
  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {
    // Uncheck the .icon-burger (checkbox) if a navigation link is clicked
    if (target.tagName === 'A' && this.isMenuOpen) {
      const checkbox = document.getElementById('nav-toggle') as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = false;
      }
      this.isMenuOpen = false;
    }
  }
}