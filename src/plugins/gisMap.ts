import { loadCss, setDefaultOptions, loadModules } from "esri-loader";
const { VITE_PUBLIC_PATH } = import.meta.env
export function setUpGisMap(ref: any, callback: any) {
  setDefaultOptions({ url: "https://js.arcgis.com/3.21/" });
  loadCss("https://js.arcgis.com/3.21/esri/css/esri.css");
  loadModules(
    [
      "esri/map",
      "esri/layers/ArcGISTiledMapServiceLayer",
      "esri/symbols/SimpleLineSymbol",
      "esri/geometry/Point",
      "esri/geometry/Extent",
      "esri/layers/GraphicsLayer",
      "esri/graphic",
      "esri/geometry/Polyline",
      "esri/SpatialReference",
      "esri/symbols/PictureMarkerSymbol",
      "esri/toolbars/draw",
      "esri/geometry/Multipoint",
      "dojo/_base/connect",
      "dijit/registry",
      "esri/InfoTemplate",
      `${VITE_PUBLIC_PATH}/ClusterLayer.js`,
      "esri/symbols/SimpleMarkerSymbol",
      "esri/renderers/ClassBreaksRenderer",
      "esri/Color",
      "esri/symbols/TextSymbol",
      "esri/layers/ArcGISDynamicMapServiceLayer",
      "esri/tasks/query",
      "dojo/domReady!",
    ],
    {}
  ).then(
    ([
      Map,
      ArcGISTiledMapServiceLayer,
      SimpleLineSymbol,
      Point,
      Extent,
      GraphicsLayer,
      Graphic,
      Polyline,
      SpatialReference,
      PictureMarkerSymbol,
      Draw,
      Multipoint,
      connect,
      registry,
      InfoTemplate,
      ClusterLayer,
      SimpleMarkerSymbol,
      ClassBreaksRenderer,
      Color,
      TextSymbol,
      ArcGISDynamicMapServiceLayer
    ]) => {
      const map: any = new Map(ref, {
        logo: false,
      })
      const mapInfo = {
        map,
        packageObj: {
          Map,
          ArcGISTiledMapServiceLayer,
          SimpleLineSymbol,
          Point,
          Extent,
          GraphicsLayer,
          Graphic,
          Polyline,
          SpatialReference,
          PictureMarkerSymbol,
          Draw,
          Multipoint,
          connect,
          registry,
          InfoTemplate,
          ClusterLayer,
          SimpleMarkerSymbol,
          ClassBreaksRenderer,
          Color,
          TextSymbol,
          ArcGISDynamicMapServiceLayer
        }
      }
      callback(mapInfo)
    }
  );
}