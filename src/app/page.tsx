'use client'

import {useEffect, useState} from "react";
import PrayerTimes from "@/app/PrayerTimes";
import moment from "moment-timezone";

export default function Home() {
    const [latitude, setLatitude] = useState<string>("45.530007");
    const [longitude, setLongitude] = useState<string>("-73.698725");
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://alislam.org/adhan/api/timings/day?lat=${latitude}&lng=${longitude}`);

            if (!response.ok) {
                throw new Error(`HTTP error Status: ${response.status}`);
            }

            const prayers: PrayerTimes | null = await response.json();
            setPrayerTimes(prayers);
        } catch (error) {
            console.error('Error fetching prayer times:', error);
        }
    };

    useEffect(() => {
        fetchData();
        console.log(longitude)
    }, [latitude, longitude]);

    const toTimeZone = (milliseconds: number, timezone: string) => {
        const momentObj = moment(milliseconds);
        return momentObj.tz(timezone).format('HH:mm:ss');
    }

    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <div className="bg-gray-100 mx-auto max-w-6xl bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
                    <form>
                        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                            <div className="-mx-3 md:flex mb-6">
                                <div className="md:w-1/2 mb-6 md:mb-0">
                                    <label className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                                           htmlFor="latitude">
                                        latitude
                                    </label>
                                    <input
                                        className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                                        id="latitude" type="text" placeholder="45.530007" value={latitude}
                                        onChange={(e) => setLatitude(e.target.value)}/>

                                </div>
                                <div className="md:w-1/2 px-3">
                                    <label className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                                           htmlFor="longitude">
                                        longitude
                                    </label>
                                    <input
                                        className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                                        id="longitude" type="text" placeholder="-73.698725" value={longitude}
                                        onChange={(e) => setLongitude(e.target.value)}/>
                                </div>
                            </div>

                            <h3 className="uppercase tracking-wide text-black text-lg font-bold mb-2 text-center mb-5">Prayer Times {prayerTimes?.locationInfo.timezone}</h3>

                            <div className="-mx-3 md:flex flex-wrap flex-col mb-2">
                                {prayerTimes?.multiDayTimings[0].prayers.map((p) =>
                                    <div key={p.time}
                                         className="grid grid-cols-3 gap-4 mb-5 place-items-center-start place-items-start items-center">
                                        <label className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                                               htmlFor="location">
                                            {p.name}
                                        </label>
                                        <div className="text-black">
                                            {toTimeZone(p.time, prayerTimes?.locationInfo.timezone)}
                                        </div>
                                        <audio controls style={{width: "80%"}}>
                                            <source src={p.audio} type="audio/mpeg"/>
                                        </audio>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </main>

        </div>
    );
}
