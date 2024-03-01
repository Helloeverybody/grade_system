import {Component, OnInit} from "@angular/core";
import interact from "@interactjs/interact";

@Component({
  template: `
    <div name="grid" class="grid">
      <div class="draggable">eeee</div>
    </div>
  `,
  standalone: true,
  styleUrl: './grid.component.scss'
})
export class GridComponent implements OnInit {
  public ngOnInit() {
    this.testInteract()
  }
  private testInteract() {

  }
}
