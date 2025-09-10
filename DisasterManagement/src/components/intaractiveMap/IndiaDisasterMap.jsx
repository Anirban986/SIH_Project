// src/components/IndiaDisasterMap.jsx
import React, { useEffect, useState, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./IndiaDisasterMap.css";

/*
  NOTES:
  - This component fetches several Data.gov.in endpoints you provided.
  - It tries to robustly parse both point-records (with lat/long fields)
    and GeoJSON-like geometry fields (if present).
  - For production, move the API key into an env var.
*/

/* ----------------- Config / API URLs ----------------- */
/* Replace these constants with env-var-based strings in prod. */

const API_LINKS = [
  // Use whichever endpoints you have; included examples (use the URLs you provided)
  "https://api.data.gov.in/resource/ee545453-ed04-43f7-9a2a-816799a67445?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json",
  "https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json",
  "https://api.data.gov.in/resource/89e449ee-6820-4503-8f42-960711cdfcaa?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json",
  // Add or remove URLs as needed (the 11bb... one you tested earlier might be unreliable)
];

/* ----------------- Small helpers ----------------- */

// create small emoji markers
const iconFactory = (emoji) =>
  new L.DivIcon({
    html: `<div class="emoji-marker">${emoji}</div>`,
    className: "",
    iconSize: [26, 26],
    iconAnchor: [13, 26],
  });

const hazardIcon = iconFactory("⚠️");
const hospitalIcon = iconFactory("🏥");
const policeIcon = iconFactory("👮");
const reliefIcon = iconFactory("⛺");

/**
 * Try to extract lat/lon from a data record.
 * Handles common keys: latitude, longitude, lat, lon, geom/geometry
 * Returns null if not found.
 */
function extractLatLon(record) {
  if (!record) return null;

  // numeric lat/lon fields
  const latKeys = ["latitude", "lat", "Latitude", "LAT", "y"];
  const lonKeys = ["longitude", "lon", "Longitude", "LON", "x"];

  for (let lk of latKeys) {
    for (let rk of lonKeys) {
      if (
        record[lk] !== undefined &&
        record[rk] !== undefined &&
        !isNaN(Number(record[lk])) &&
        !isNaN(Number(record[rk]))
      ) {
        return [Number(record[lk]), Number(record[rk])];
      }
    }
  }

  // Sometimes coordinates are in a single field like "geom","the_geom" or "location"
  const geomKeys = ["geometry", "geom", "the_geom", "location", "geojson"];
  for (let gk of geomKeys) {
    const v = record[gk];
    if (!v) continue;
    // if it's an object with type & coordinates (GeoJSON)
    if (typeof v === "object" && v.type && v.coordinates) {
      const coords = v.coordinates;
      // point: [lon, lat]
      if (Array.isArray(coords) && coords.length >= 2) return [Number(coords[1]), Number(coords[0])];
    }
    // if it's a string like "POINT(lon lat)" or "lon,lat"
    if (typeof v === "string") {
      const matchPoint = v.match(/POINT\s*\(\s*([-\d\.]+)\s+([-\d\.]+)\s*\)/i);
      if (matchPoint) return [Number(matchPoint[2]), Number(matchPoint[1])];
      const comma = v.split(",");
      if (comma.length >= 2 && !isNaN(comma[0]) && !isNaN(comma[1])) {
        return [Number(comma[0]), Number(comma[1])];
      }
    }
  }

  return null;
}

/* ----------------- Component ----------------- */

export default function IndiaDisasterMap({ width = "50%", height = "540px" }) {
  const [records, setRecords] = useState([]); // raw records from all APIs
  const [geoJsons, setGeoJsons] = useState([]); // any FeatureCollections directly returned
  const [loading, setLoading] = useState(true);
  const [mapRef, setMapRef] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchAll() {
      setLoading(true);
      setError(null);

      const allRecords = [];
      const allGeo = [];

      for (const url of API_LINKS) {
        try {
          const res = await fetch(url, { cache: "no-store" });
          if (!res.ok) {
            console.warn("API returned non-OK:", url, res.status);
            continue;
          }
          const data = await res.json();

          // data.gov.in usually returns { records: [...] } or sometimes direct FeatureCollection
          if (data && data.records && Array.isArray(data.records)) {
            // append
            allRecords.push(...data.records);
          } else if (data && data.type === "FeatureCollection") {
            allGeo.push(data);
          } else if (Array.isArray(data)) {
            allRecords.push(...data);
          } else {
            // Attempt to detect nested arrays
            const maybeRecords = Object.values(data).find((v) => Array.isArray(v));
            if (maybeRecords) allRecords.push(...maybeRecords);
            else {
              // fallback: attach the whole object as a single record
              allRecords.push(data);
            }
          }
        } catch (err) {
          console.error("Fetch error for", url, err);
        }
      }

      if (!cancelled) {
        setRecords(allRecords);
        setGeoJsons(allGeo);
        setLoading(false);
      }
    }

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, []);

  /* ---- Convert records to marker features ---- */
  const { hazardPoints, hospitalPoints, policePoints, reliefPoints } = useMemo(() => {
    const hazardPoints = [];
    const hospitalPoints = [];
    const policePoints = [];
    const reliefPoints = [];

    for (const rec of records) {
      const latlon = extractLatLon(rec);
      // If the record contains a 'type' or 'category' field, try to classify
      const typeField = (rec.type || rec.hazard_type || rec.category || rec.disaster || rec.disaster_type || "").toString().toLowerCase();
      const name = rec.name || rec.place || rec.location || rec.town || rec.district || rec.state || rec.title || "";

      if (latlon) {
        const [lat, lon] = latlon;
        const base = { id: rec._id || rec.id || Math.random().toString(36).slice(2, 9), lat, lon, raw: rec, name };

        // classify heuristically
        if (/hospital|health/i.test(JSON.stringify(rec)) || /hospital/i.test(typeField) || /hospital/i.test(name)) {
          hospitalPoints.push(base);
        } else if (/police|station|thana/i.test(JSON.stringify(rec)) || /police/i.test(typeField) || /police/i.test(name)) {
          policePoints.push(base);
        } else if (/relief|camp|shelter|temporary/i.test(JSON.stringify(rec)) || /relief|camp|shelter/i.test(typeField) || /camp/i.test(name)) {
          reliefPoints.push(base);
        } else {
          // fallback: treat as hazard point if fields suggest disaster / hazard
          if (/flood|cyclone|earthquake|landslide|drought|heat|hazard|affected|disaster/i.test(JSON.stringify(rec)) || /flood|cyclone|earthquake|landslide/i.test(typeField)) {
            hazardPoints.push(base);
          } else {
            // unknown — put into hazardPoints so it's visible for inspection
            hazardPoints.push(base);
          }
        }
      } else {
        // No latlon: if record contains geojson geometry, add to geoJsons
        // Many APIs include geometry in record.geometry
        if (rec.geometry || rec.geom || rec.geojson) {
          // normalize into a Feature
          const geometry = rec.geometry || rec.geom || rec.geojson;
          if (geometry && geometry.type && geometry.coordinates) {
            const feat = {
              type: "Feature",
              properties: rec,
              geometry,
            };
            // push as FeatureCollection
            geoJsons.push({ type: "FeatureCollection", features: [feat] });
          }
        }
      }
    }

    return { hazardPoints, hospitalPoints, policePoints, reliefPoints };
  }, [records, geoJsons]);

  /* ---------- Render ---------- */

  // map center (India)
  const center = [22.0, 79.0];

  return (
    <div className="idm-wrapper" style={{ width, height }}>
      <div className="idm-header">
        <h3>India Disaster Map</h3>
        {loading ? <div className="idm-status">Loading data…</div> : null}
        {error ? <div className="idm-error">{String(error)}</div> : null}
      </div>

      <MapContainer
        center={center}
        zoom={5}
        style={{ width: "100%", height: "calc(100% - 48px)" }}
        whenCreated={(map) => setMapRef(map)}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />

        <LayersControl position="topright">
          {/* GeoJSON hazard layers (from FeatureCollections returned directly) */}
          {geoJsons.length > 0 && (
            <LayersControl.Overlay name="Hazard Areas (GeoJSON)">
              <div>
                {geoJsons.map((gc, i) => (
                  <GeoJSON key={`gc-${i}`} data={gc} style={(f) => {
                    const t = (f.properties?.hazard_type || f.properties?.type || "").toString().toLowerCase();
                    if (/flood/i.test(t)) return { color: "#0b64ff", weight: 2, fillOpacity: 0.18 };
                    if (/seismic|earthquake/i.test(t)) return { color: "#ff2020", weight: 2, fillOpacity: 0.12 };
                    return { color: "#aa00aa", weight: 2, fillOpacity: 0.08 };
                  }} onEachFeature={(f, layer) => {
                    const p = f.properties || {};
                    layer.bindPopup(`<strong>${p.name || p.title || p.hazard_type || p.type || "Hazard"}</strong><br/>${p.description || p.note || ""}`);
                  }} />
                ))}
              </div>
            </LayersControl.Overlay>
          )}

          {/* Hazard Points */}
          <LayersControl.Overlay name={`Disaster Points (${hazardPoints.length})`} checked>
            <MarkerClusterGroup>
              {hazardPoints.map((h) => (
                <Marker key={`h-${h.id}`} position={[h.lat, h.lon]} icon={hazardIcon}>
                  <Popup>
                    <strong>{h.name || "Affected area"}</strong>
                    <br />
                    <small>Source data preview:</small>
                    <pre className="idm-popup-pre">{JSON.stringify(h.raw, null, 2)}</pre>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </LayersControl.Overlay>

          {/* Hospitals */}
          <LayersControl.Overlay name={`Hospitals (${hospitalPoints.length})`}>
            <MarkerClusterGroup>
              {hospitalPoints.map((p) => (
                <Marker key={`hp-${p.id}`} position={[p.lat, p.lon]} icon={hospitalIcon}>
                  <Popup>
                    <strong>{p.raw.name || p.name || "Hospital"}</strong>
                    <br />
                    {p.raw.address || p.raw.city || p.raw.district || ""}
                    <pre className="idm-popup-pre">{JSON.stringify(p.raw, null, 2)}</pre>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </LayersControl.Overlay>

          {/* Police */}
          <LayersControl.Overlay name={`Police (${policePoints.length})`}>
            <MarkerClusterGroup>
              {policePoints.map((p) => (
                <Marker key={`pp-${p.id}`} position={[p.lat, p.lon]} icon={policeIcon}>
                  <Popup>
                    <strong>{p.raw.name || p.name || "Police Station"}</strong>
                    <pre className="idm-popup-pre">{JSON.stringify(p.raw, null, 2)}</pre>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </LayersControl.Overlay>

          {/* Relief Camps */}
          <LayersControl.Overlay name={`Relief Camps (${reliefPoints.length})`}>
            <MarkerClusterGroup>
              {reliefPoints.map((r) => (
                <Marker key={`rc-${r.id}`} position={[r.lat, r.lon]} icon={reliefIcon}>
                  <Popup>
                    <strong>{r.raw.name || r.name || "Relief Camp"}</strong>
                    <br />
                    {r.raw.capacity ? `Capacity: ${r.raw.capacity}` : null}
                    <pre className="idm-popup-pre">{JSON.stringify(r.raw, null, 2)}</pre>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </LayersControl.Overlay>
        </LayersControl>

        {/* Legend */}
        {mapRef && (
          <div className="idm-legend">
            <strong>Legend</strong>
            <div className="legend-row"><span className="legend-emoji">⚠️</span> Disaster point</div>
            <div className="legend-row"><span className="legend-emoji">🏥</span> Hospital</div>
            <div className="legend-row"><span className="legend-emoji">👮</span> Police</div>
            <div className="legend-row"><span className="legend-emoji">⛺</span> Relief camp</div>
          </div>
        )}
      </MapContainer>
    </div>
  );
}
