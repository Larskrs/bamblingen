"use client";
import CountdownTimer from "@/components/common/CountdownTimer";
import { useState, useEffect } from "react";

export default function VGS() {
    const [nextEvent, setNextEvent] = useState({date: new Date()});

    const MinutterPerTime = 45;
    const MinutterPerPause = 10;
    const minutesBase = 60 * 8; // Start time (8:00 AM)

    const getDateTimeFromMinutes = (minutesSinceMidnight) => {
        if (minutesSinceMidnight < 0 || minutesSinceMidnight >= 1440) {
            throw new Error("minutesSinceMidnight must be between 0 and 1439 (inclusive).");
        }

        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return new Date(startOfDay.getTime() + minutesSinceMidnight * 60000);
    };

    const getTodaysTimes = () => {
        let times = [];
        let lastEventDuration = 0;

        for (let i = 0; i < 8; i++) {
            const session = {
                type: "session",
                date: getDateTimeFromMinutes(minutesBase + lastEventDuration),
            };
            lastEventDuration += MinutterPerTime;

            const recess = {
                type: "recess",
                date: getDateTimeFromMinutes(minutesBase + lastEventDuration),
            };
            if (i === 4) {
                // Longer recess after the 4th session
                lastEventDuration += 30;
            } else {
                lastEventDuration += MinutterPerPause;
            }

            times = [...times, session, recess];
        }

        return times;
    };

    const updateNextEvent = () => {
        const currentTime = new Date();
        const events = getTodaysTimes();

        // Find the next event that's in the future
        const upcomingEvent = events.find(event => event.date > currentTime);
        if (upcomingEvent) {
            setNextEvent(upcomingEvent);
        }
    };

    // Use useEffect to update `nextEvent` whenever the component renders or the current time changes
    useEffect(() => {
        updateNextEvent();

        // Optionally, set up an interval to keep checking for the next event
        const interval = setInterval(() => {
            updateNextEvent();
        }, 1000); // Check every second

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{display: "flex", flexDirection: "column", height: "100%", alignItems: "center", justifyContent: "center"}}>
            {nextEvent.type == "recess" && <p>Neste pause er om...</p>}
            {nextEvent.type == "session" && <p>Pausen er over om...</p>}
            <CountdownTimer targetDate={nextEvent.date} />

            {/* <pre>{JSON.stringify(getTodaysTimes(), null, 4)}</pre> */}
        </div>
    );
}
