// utils/useAuth.js
import {jwtDecode} from "jwt-decode";

function getDecodedToken(token) {
  try {
    return jwtDecode(token);
  } catch (e) {
    return null;
  }
}

export function isTokenExpired(token) {
  const decoded = getDecodedToken(token);
  if (!decoded) return true;
  
  const now = Date.now() / 1000; // current time in seconds
  // console.log("Decode => ",now)
  return decoded.exp < now;
}

export function getUserRole(token) {
  const decoded = getDecodedToken(token);
  return decoded?.authorities;
}

export function getUserCenID(token) {
    const decoded = getDecodedToken(token);
    return decoded?.sub;
  }

export default {getDecodedToken, isTokenExpired, getUserCenID, getUserRole};