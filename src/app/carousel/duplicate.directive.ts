import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDuplicate]',
  standalone: true
})
export class DuplicateDirective implements OnInit {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  ngOnInit()
  {
      this.viewContainer.createEmbeddedView(this.templateRef)
      this.viewContainer.createEmbeddedView(this.templateRef)
      this.viewContainer.createEmbeddedView(this.templateRef)

  }
}
