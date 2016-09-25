const getCurrentPosition = (options?: PositionOptions): Promise<Position> => {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

const getLocation = (): Promise<{ lat: number; lng: number; }> => {
  return getCurrentPosition().then((position) => {
    return {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
  });
};

export { getLocation };
