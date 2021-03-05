import "ol/ol.css";
import { Component, OnInit } from "@angular/core";
import { Map, View, Feature, Point } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { GeoJSON } from "ol/format";
import OSM from "ol/source/OSM";
import { WebGLPoints as WebGLPointsLayer } from "ol/layer";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private readonly http: HttpClient) {}

  map: Map;
  imageOfMe: any;

  vectorSource: VectorSource = new VectorSource({
    url:
      "https://raw.githubusercontent.com/DavidSekula/angular-openlayer-playground-sh6q5s/master/src/assets/world-cities.json",
    format: new GeoJSON()
  });

  ngOnInit() {
    this.map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });

    this.displayLayer();
  }

  displayLayer() {
    return this.http
      .get(
        "https://raw.githubusercontent.com/DavidSekula/angular-openlayer-playground-sh6q5s/master/src/assets/oldme.txt",
        { responseType: "text" as "json" }
      )
      .toPromise()
      .then(data => {
        this.imageOfMe = data;
      })
      .then(() => {
        const featureStyle = {
          symbol: {
            symbolType: "image",
            src: this.imageOfMe,
            size: [20, 20],
            rotateWithView: false,
            offset: [0, 0]
          }
        };

        const pointsLayer = new WebGLPointsLayer({
          source: this.vectorSource,
          style: featureStyle,
          disableHitDetection: false
        });

        this.map.addLayer(pointsLayer);
      });
  }
}
