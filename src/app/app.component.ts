import "ol/ol.css";
import { Component, OnInit } from "@angular/core";
import { Map, View, Feature, Point } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { GeoJSON } from "ol/format";
import OSM from "ol/source/OSM";
import { WebGLPoints as WebGLPointsLayer } from "ol/layer";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  map: Map;

  vectorSource: VectorSource = new VectorSource({
    url:
      "https://openlayers.org/en/latest/examples/data/geojson/world-cities.geojson",
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

    this.refreshLayer();
  }

  refreshLayer() {
    const featureStyle = {
      symbol: {
        symbolType: "image",
        src: "assets/oldme.png",
        size: [18, 28],
        color: "lightyellow",
        rotateWithView: false,
        offset: [0, 9]
      }
    };

    const pointsLayer = new WebGLPointsLayer({
      source: this.vectorSource,
      style: featureStyle,
      disableHitDetection: false
    });

    this.map.addLayer(pointsLayer);
    this.animate();
  }

  animate() {
    this.map.render();
    window.requestAnimationFrame(this.animate);
  }
}
