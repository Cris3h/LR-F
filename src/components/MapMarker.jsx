"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Loading from "@/app/loading/Loading";
import { Marker, Popup } from "react-leaflet";
import MarkerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png";

import L from "leaflet";
import MapModal from "./MapModal";
import { fetchSingleArtWork } from "@/utils/fetchs";

const defaultIcon = new L.Icon({
  iconUrl: MarkerIcon.src,
  iconRetinaUrl: MarkerIcon.src,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
  shadowUrl: MarkerShadow.src,
  shadowSize: [41, 41],
});

function ArtMarker({ artId, coordinates, title }) {
  const markerRef = useRef(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const data = await fetchSingleArtWork(artId);
    const [fetchError, obj] = data;
    setLoading(false);
    if (fetchError || !obj) return;
    setDetails(obj);
  }, [artId, loading]);

  useEffect(() => {
    if (!details) return;
    const t = setTimeout(() => {
      markerRef.current?.openPopup();
    }, 0);
    return () => clearTimeout(t);
  }, [details]);

  const eventHandlers = useMemo(
    () => (!details ? { click: handleClick } : undefined),
    [details, handleClick]
  );

  return (
    <Marker
      ref={markerRef}
      icon={defaultIcon}
      position={coordinates}
      title={title || ""}
      eventHandlers={eventHandlers}
    >
      {details && (
        <Popup maxWidth={320} minWidth={220} offset={[0, 8]}>
          <MapModal id={artId} details={details} />
        </Popup>
      )}
    </Marker>
  );
}

const MapMarker = ({ artWork }) => {
  const all = useMemo(
    () =>
      artWork.map(({ _id, coordinates, name }) => ({
        _id,
        coordinates,
        name,
      })),
    [artWork]
  );

  if (!artWork?.length) {
    return <Loading />;
  }

  return all.map((e, i) => (
    <ArtMarker
      key={e._id?.toString?.() ?? `${i}`}
      artId={e._id?.toString()}
      coordinates={e.coordinates}
      title={e.name ? e.name : ""}
    />
  ));
};

export default MapMarker;
