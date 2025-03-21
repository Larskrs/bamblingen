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
                lastEventDuration += 10;
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

    console.log()

    if (nextEvent.type == "recess") return <RecessDisplay />
    if (nextEvent.type == "session") return <SessionDisplay />
    

    function RecessDisplay () {
        return (
        <div style={{display: "flex", flexDirection: "column", height: "100%", alignItems: "center", justifyContent: "center"}}>
            <h2>Timen er ferdig om...</h2>
            <div style={{padding: "1rem 2rem", background: "var(--white-900)", color: "black"}}>
                <CountdownTimer digits={2} targetDate={nextEvent.date} />
            </div>
            {/* <pre>{JSON.stringify(getTodaysTimes(), null, 4)}</pre> */}
        </div>
    );
    }
    function SessionDisplay () {
        return (
        <div style={{display: "flex", flexDirection: "column", height: "100%", alignItems: "center", justifyContent: "center"}}>
            <h1>Da var det pause</h1>
            <div style={{padding: "1rem 2rem", background: "black", color: "white"}}>
                <CountdownTimer digits={2} targetDate={nextEvent.date} />
            </div>
            {/* <pre>{JSON.stringify(getTodaysTimes(), null, 4)}</pre> */}
        </div>
    );
    }
}
