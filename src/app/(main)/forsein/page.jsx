"use client";
import CountdownTimer from "@/components/common/CountdownTimer";
import { formatRelativeDate, TimeAgo } from "@/lib/timeLib";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./page.module.css"

export default function VGS() {
    const [nextEvent, setNextEvent] = useState({date: new Date()});

    const MinutterPerTime = 45;
    const MinutterPerPause = 10;
    const minutesBase = 60 * 8; // Start time (8:00 AM)

    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        setSchedule(getTodaysTimes()); // Calculate once and store in state
    }, []);

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
        const upcomingEvent = schedule.find(event => event.date > currentTime);
    
        if (upcomingEvent && nextEvent.date.getTime() !== upcomingEvent.date.getTime()) {
            setNextEvent(upcomingEvent);
        }
    };

    // Use useEffect to update `nextEvent` whenever the component renders or the current time changes
    useEffect(() => {
        updateNextEvent(); // Run once on mount
    
        const interval = setInterval(() => {
            updateNextEvent();
        }, 1000); // Update every second
    
        return () => clearInterval(interval);
    }, [schedule, nextEvent]); // Depend only on schedule & nextEvent

    console.log()

    if (nextEvent.type == "recess") return <RecessDisplay />
    if (nextEvent.type == "session") return <SessionDisplay />
    

    function RecessDisplay () {
        
        let overtime = new Date(nextEvent.date.getTime() - 30 * 60 * 1000);
        let isLate = new Date() > overtime

        const minw = Math.abs((new Date() - overtime) / (1000 * 60)); // Difference in minutes
        const progress = (minw / 100) * 100; // Percentage of an hour

        const [sinceSession, setSinceSession] = useState(new Date())

        
          useEffect(() => {
            const timer = setInterval(() => {
              setSinceSession(new Date() - overtime);
            }, 1000*1);
        
            return () => clearInterval(timer); // Clean up on component unmount
          }, [sinceSession]);
    
        return (
            <>
                {isLate && <Image className={styles.gif} src="https://i.giphy.com/3o6gb3kkXfLvdKEZs4.webp" height={320} width={600} />}
                <div style={{zIndex: "10", display: "flex", flexDirection: "column", height: "100%", alignItems: "center", justifyContent: "center"}}>
                    <h2>{isLate ? "Du er forsein!" : "Du er snart forsein"}</h2>
                    {isLate && <p>Du ble forsinka {formatRelativeDate(new Date(nextEvent.date.getTime() - 45 * 60 * 1000))}</p>}
                    {!isLate && <p>Timen startet {formatRelativeDate(new Date(nextEvent.date.getTime() - 45 * 60 * 1000))}</p>}
                    {sinceSession && <div className={styles.bad} style={{animationDuration: `${progress*75}ms`}}>
                        <CountdownTimer digits={2} targetDate={overtime} />
                    </div>}
                </div>
            </>
        );
    }
    function SessionDisplay () {
        return (
        <div style={{display: "flex", flexDirection: "column", height: "100%", alignItems: "center", justifyContent: "center"}}>
            <h1>Timen begynner om...</h1>
            <div style={{padding: "1rem 2rem", background: "white", color: "black"}}>
                <CountdownTimer digits={2} targetDate={nextEvent.date} />
            </div>
            {/* <pre>{JSON.stringify(getTodaysTimes(), null, 4)}</pre> */}
        </div>
    );
    }
}
