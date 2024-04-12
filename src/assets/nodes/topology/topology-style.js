import {
  GraphNodeType,
  GraphCurveType,
  GraphArrowType,
} from "../../../app/graph.domain";
import {baseShapes, svgToDataUrl} from "../../../utils/svg/svg";

export default {
  style: [
    {
      selector: "node",
      style: {
        "background-color": "#98678a",
        "padding-top": "10px",
        shape: GraphNodeType.ellipse,
      },
    },
    {
      selector: "node[label]",
      style: {
        label: "data(label)",
        "font-size": "15",
        color: "#000",
        "text-valign": "bottom",
        "text-halign": "center",
      },
    },
    {
      selector: "edge",
      style: {
        width: 1.5,
        "line-color": "#cecece",
        "target-arrow-shape": GraphArrowType.triangle,
        "target-arrow-color": "green",
        "curve-style": GraphCurveType.bezier,
        "control-point-weights": "0.25 .65",
        "control-point-distances": "data(controlPointDistances)",
      },
    },
    {
      selector: "edge[label]",
      style: {
        label: "data(label)",
        "font-size": "10",
        "text-background-color": "white",
        "text-background-opacity": 1,
        "text-background-padding": "2px",
        "text-margin-y": -4,
        "text-margin-x": -4,
        // so the transition is selected when its label/name is selected
        "text-events": "yes",
      },
    },
    {
      selector: "#nparent",
      style: {
        "background-image": svgToDataUrl(baseShapes.circle(0, 0, 100, new Map("fill", "red"))),
        "width": "200px",
        "height": "200px",
        "border-width": "2px",
        "border-color": "#000",
        "border-style": "solid",
      },
    },
  ],
};
