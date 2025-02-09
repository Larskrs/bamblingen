"use client"
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import classNames from 'classnames';

export default function VideoPlayer({ poster, src, className, ...props }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                // Safari støtter HLS direkte
                videoRef.current.src = src;
            } else if (Hls.isSupported()) {
                // For andre nettlesere, bruk hls.js
                const hls = new Hls();
                hls.loadSource(src);
                hls.attachMedia(videoRef.current);
            }
        }
    }, [src]);

    return <video {...props} poster={poster} className={classNames(className)} ref={videoRef} controls  />;
}