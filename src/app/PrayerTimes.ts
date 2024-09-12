export default interface PrayerTimes {
    locationInfo: LocationInfo
    multiDayTimings: MultiDayTiming[]
}

export interface LocationInfo {
    lat: string
    lng: string
    timezone: string
}

export interface MultiDayTiming {
    prayers: Prayer[]
    coordinates: Coordinates
    date: number
}

export interface Prayer {
    name: string
    time: number
    audio?: string
}

export interface Coordinates {
    latitude: number
    longitude: number
}
