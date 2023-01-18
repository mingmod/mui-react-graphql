import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ALL_STATIONS } from "../queries/stations";
import useSortParams, { Order } from "./useSortParams";

type StationMetrics = {
  volume: Number;
  margin: Number;
  profit: Number;
};

export type Station = {
  id: Number;
  name: string;
  metrics: StationMetrics;
};

const sortableFields = new Set(["id", "name", "volume", "margin", "profit"]);

const getSortableField = (station: Station, orderBy: string) =>
  station[orderBy as keyof Station] ??
  station.metrics[orderBy as keyof StationMetrics];

export const useStations = () => {
  const { loading, error, data } = useQuery<{ stations: Station[] }>(
    GET_ALL_STATIONS
  );
  const { sort } = useSortParams("name");
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    const stations = data?.stations;
    if (Array.isArray(stations) && !loading) {
      const nextStations = [...stations];
      const { order, orderBy } = sort;
      if (sortableFields.has(orderBy)) {
        nextStations.sort((a, b) => {
          const valueA = getSortableField(a, orderBy);
          const valueB = getSortableField(b, orderBy);
          if (valueA === valueB) return 0;
          const mod = order === Order.ASC ? 1 : -1;
          return valueA > valueB ? mod : -1 * mod;
        });
      }
      setStations(nextStations);
    }
  }, [data, sort, loading]);

  return { loading, error, data: stations };
};
