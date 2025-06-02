import Map from "../utils/map";

export async function reportMapper(report) {
  const placeNames = await Map.getPlaceNameByCoordinate(
    report.location.latitude,
    report.location.longitude
  );

  return {
    ...report,
    location: {
      ...report.location,
      placeNameShort: placeNames.short,
      placeNameFull: placeNames.full,
    },
  };
}
