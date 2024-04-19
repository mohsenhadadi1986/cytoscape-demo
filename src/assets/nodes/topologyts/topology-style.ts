import {
    GraphNodeType,
    GraphCurveType,
    GraphArrowType,
} from "../../../app/graph.domain";
import {baseShapes, svg, svgToDataUrl} from "../../../utils/svg/svg";

export default {
    style: [
        {
            selector: "node",
            style: {
                "background-color": "white",
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
                display:"none",
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
            selector: "#n1",
            style: {
                "background-image": svgToDataUrl(baseShapes.circle(50, 50, 50, new Map([["fill", "red"]])), 100, 100),
                "background-width": "100%",
                "background-height": "100%",
                "background-fit": "contain",
                "shape": "roundrectngle",
                "border": "none",
                "border-color": "white",
                "border-style": "solid",
            },
        },
    ] as cytoscape.Stylesheet[],
};
