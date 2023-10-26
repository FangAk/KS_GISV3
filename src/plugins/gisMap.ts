import { loadCss, setDefaultOptions, loadModules } from "esri-loader";
const { VITE_PUBLIC_PATH } = import.meta.env
export function setUpGisMap(ref: any, callback: any) {
  setDefaultOptions({ url: "https://js.arcgis.com/4.21/" });
  loadCss("https://js.arcgis.com/4.21/esri/themes/light/main.css");
  loadModules(
    [
      "esri/config",
      "esri/WebMap",
      "esri/views/MapView",
      "esri/widgets/ScaleBar",
      "esri/widgets/Legend"
    ],
    {}
  ).then(
    ([
      esriConfig, WebMap, MapView, ScaleBar, Legend
    ]) => {
      const map: any = new WebMap(ref, {
        portalItem: {
          id: "41281c51f9de45edaf1c8ed44bb10e30"
        }
      })
      const mapInfo = {
        map,
        packageObj: {
          esriConfig, WebMap, MapView, ScaleBar, Legend
        }
      }
      callback(mapInfo)
    }
  );
}