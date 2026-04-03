import React from "react";
import Map from "@/components/ArgentinianMap/";

export const metadata = {
  title: 'Mapa de obras'
}
function MapAr() {
  return (
    <div
      style={{
        marginBottom: "max(50px, env(safe-area-inset-bottom, 0))",
      }}
    >
      <Map />
    </div>
  );
}

export default MapAr;
