// Synchronous database opening
import fs from 'fs'
import { Reader } from '@maxmind/geoip2-node'
const dbBuffer = fs.readFileSync('./geoip/City/GeoLite2-City.mmdb');
// This reader object should be reused across lookups as creation of it is
// expensive.
const reader = await Reader.openBuffer(dbBuffer);

export async function getCountry(ip_address) {
    const response = reader.city(ip_address)
    return [response.country.names.en, response.country.isoCode, response.country.geonameId]
}

export async function getCity(ip_address) {
    const response = reader.city(ip_address);
    return [response.city.names.en, response.city.geonameId]
}

