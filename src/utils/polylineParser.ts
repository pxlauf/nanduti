export const decodePolyline = (encoded: string): { latitude: number; longitude: number }[] => {
  const points: { latitude: number; longitude: number }[] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;
  
  while (index < encoded.length) {
    let b: number;
    let shift = 0;
    let result = 0;
    
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    
    const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;
    
    shift = 0;
    result = 0;
    
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    
    const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lng += dlng;
    
    points.push({
      latitude: lat / 1e5,
      longitude: lng / 1e5,
    });
  }
  
  return points;
};

export const encodePolyline = (points: { latitude: number; longitude: number }[]): string => {
  let encoded = '';
  let lastLat = 0;
  let lastLng = 0;
  
  for (const point of points) {
    const lat = Math.round(point.latitude * 1e5);
    const lng = Math.round(point.longitude * 1e5);
    
    const dLat = lat - lastLat;
    const dLng = lng - lastLng;
    
    lastLat = lat;
    lastLng = lng;
    
    encoded += encodeSignedNumber(dLat);
    encoded += encodeSignedNumber(dLng);
  }
  
  return encoded;
};

const encodeSignedNumber = (num: number): string => {
  let sgnNum = num << 1;
  if (num < 0) {
    sgnNum = ~sgnNum;
  }
  
  let encoded = '';
  while (sgnNum >= 0x20) {
    encoded += String.fromCharCode((0x20 | (sgnNum & 0x1f)) + 63);
    sgnNum >>= 5;
  }
  encoded += String.fromCharCode(sgnNum + 63);
  
  return encoded;
};