
const styleMap2Str = (styleMap: Map<string, string>) => {
    if( !styleMap ){
        return '';
    }

    let s = '';

    for( let [k, v] of styleMap ){
        s += k + '=' + '"' + v + '"' + ' ';
    }

    return s;
};

const filter = <T>(inputs: T[], callback: (item: T) => boolean) => {
    const newInputs: T[] = [];
    for(let i = 0; i < inputs.length; i++) {
        if(callback(inputs[i])) {
            newInputs.push(inputs[i])
        }
    }
    return newInputs
}


export const svg = (svgBody: string, width = 100, height = 100): HTMLElement => {
    const parser = new DOMParser();
    let svgText =
        `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg><svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='${width}' height='${height}'>${svgBody}</svg>`;
    return parser.parseFromString(svgText, 'text/xml').documentElement;
};

export const svgToDataUrl = (svgBody: string, width: number, height: number): string => {
    let s = svg(svgBody, width, height);
    // uri component string
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(s.outerHTML);
};

export const baseShapes = {
    circle (cx: number, cy: number, r: number, styleMap?: Map<string, string>) {
        return `<circle cx='${cx}' cy='${cy}' r='${r}' ${styleMap ? styleMap2Str(styleMap): ""} />`;
    },
}