import { Component,VERSION } from '@angular/core';

@Component({
  selector: 'layout-footer',
  templateUrl: './layout.footer.html',
  styleUrls: [ './layout.footer.css' ]
})
export class LayoutFooter  {
  version = 'Angular: v' + VERSION.full;
}