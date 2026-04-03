"use client"
import { useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MapMarker from "../MapMarker";
import { GlobalContext } from "@/AppContext/AppContext";
import "leaflet/dist/leaflet.css";
import styles from "@/styles/maparg.module.css";
import Loading from "@/app/loading/Loading";


const MapAr = () => {
  const { artWork } = useContext(GlobalContext);

 return artWork ? (
    <div className={styles.mainContainer}>
      <MapContainer
        style={{ width: "100%" }}
        className={styles.mapContainer}
        // center={[-35.18472252556349, -64.93582512687698]} // pos 1
        center={[-35.156832662720525, -62.62834418174262]}  // pos 2
        zoom={4}
        scrollWheelZoom={false}
        cancelable={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.ign.gob.ar/AreaServicios/Argenmap/Introduccion">Instituto Geográfico Nacional</a> · datos <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{y}.png"
          tms
        />
        {/* {artWork && (<Link href={<MapModal/>}> <MapMarker artWork={artWork} /> </Link>)} */}

        {artWork && <MapMarker artWork={artWork} />}

      </MapContainer>
    </div>
  ) : (<><Loading /></>);
};

export default MapAr;
