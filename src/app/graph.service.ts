import { Observable, map, of } from 'rxjs';
import { GraphElement, GraphElementStyle, GraphOptions } from './graph.domain';
import styleData from '../assets/nodes/topology/topology-style.js';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(protected http: HttpClient) {}

  listElements(): Observable<cytoscape.ElementDefinition[]> {
    return this.http.get<GraphElement>('assets/nodes/topology/topology.json').pipe(
      map(data => data.nodes)
    );
  }

  listStyles(): Observable<cytoscape.Stylesheet[]> {
    return of(styleData.style);
  }
  
  loadLayout(): Observable<cytoscape.LayoutOptions | undefined> {
    return this.http.get<GraphOptions>('assets/nodes/topology/topology-layout.json').pipe(
      map(data => data.data)
    );
  }
}