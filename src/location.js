export function Location(data) {
    this.name = data.name;
    this.region = data.region;
    this.country = data.country;
    this.tzID = data.tz_id;
    this.localTime = data.localtime;
    this.latitude = data.lat;
    this.longitude = data.lon;
}