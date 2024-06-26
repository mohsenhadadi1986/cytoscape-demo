import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from "@angular/core";
import { combineLatest } from "rxjs";
import cytoscape from "cytoscape";
import ciseLayout from "cytoscape-cise";
import { GraphService } from "./graph.service";
cytoscape.use(ciseLayout);

@Component({
  selector: "app-root",
  // standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  @ViewChild("cy") cytoElem: ElementRef;
  cy: cytoscape.Core;
  selectedNodes: string[] = [];
  nodeOriginalColors: { [id: string]: string } = {};

  constructor(private service: GraphService) {}

  ngOnInit(): void {
    cytoscape.use(ciseLayout);

    combineLatest([
      this.service.listElements(),
      this.service.listStyles(),
      this.service.loadLayout(),
    ]).subscribe((value) => {
      this.initCharts(...value);
      this.attachNodeClickHandler();
      this.attachEdgeVisibilityHandlers();

      this.getCompoundNodeSize("n1");
    });
  }

  initCharts(
    elements: cytoscape.ElementDefinition[],
    style: cytoscape.Stylesheet[],
    option: cytoscape.LayoutOptions | undefined
  ): void {
    this.cy = cytoscape({
      container: this.cytoElem.nativeElement,
      layout: option,
      style: style,
      elements: elements,
    });

    this.cy.nodes().forEach((node) => {
      this.nodeOriginalColors[node.id()] = node.style("background-color");
    });
    this.cy.$("#n5, #n6, #n7").makeLayout({
      name: "circle",
    }).run()
  }

  attachNodeClickHandler(): void {
    this.cy.on("tap", "node", (event) => {
      const node = event.target;
      const nodeId = node.id();

      if (this.selectedNodes.includes(nodeId)) {
        this.deselectNode(node);
      } else {
        this.selectedNodes.push(nodeId);
        node.style("background-color", "green");
      }
    });
  }

  deselectNode(node: cytoscape.NodeSingular): void {
    const nodeId = node.id();
    const originalColor = this.nodeOriginalColors[nodeId];

    if (originalColor) {
      node.style("background-color", originalColor);

      this.selectedNodes = this.selectedNodes.filter((id) => id !== nodeId);
    }
  }

  attachEdgeVisibilityHandlers(): void {
    this.cy.nodes().on("mouseover", (event) => {
      const node = event.target;
      node.connectedEdges().forEach((edge) => {
        edge.show();
      });
    });

    this.cy.nodes().on("mouseout", (event) => {
      const node = event.target;
      node.connectedEdges().forEach((edge) => {
        edge.hide();
      });
    });
  }

  getCompoundNodeSize(nodeId: string): void {
    const node = this.cy.$(`#${nodeId}`);
    const boundingBox = node.boundingBox();

    const width = boundingBox.w;
    const height = boundingBox.h;

    console.log("Width:", width);
    console.log("Height:", height);
  }
}
