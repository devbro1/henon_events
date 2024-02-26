import React, { useEffect, useState, useContext } from 'react';
import { RestAPI } from 'scripts/api';
import { APIPath, RoutePath } from 'data';

import Timeline from 'react-timelines-issa';
import 'react-timelines-issa/lib/css/style.css'
import { START_YEAR, NUM_OF_YEARS, NUM_OF_TRACKS } from './constants';
import { buildTimebar, buildTrack } from './builders';
import { fill } from './utils';


function EventsTimelineComp() {
    const now = new Date('2024-01-01');
    const MIN_ZOOM = 2;
    const MAX_ZOOM = 20;
    const start = new Date(`${START_YEAR}`);
    const end = new Date(`${START_YEAR + NUM_OF_YEARS}`);
    const zoom = 2;
    const open = false;
    const timebar = buildTimebar();

    const [events, setEvents] = useState([]);
    const [tracks, setTracks] = useState([]);

    const tracksById = fill(5).reduce((acc, i) => {

        const track = buildTrack(i+1)
        acc[track.id] = track
        return acc
      }, {});
    
    const tracks2 = Object.values(tracksById);
    console.log(tracks);

    useEffect(() => {
        RestAPI.get(APIPath.events.index()).then(({ data }) => {
            setEvents(data.data);
            let t = [];
            let id = 1;
            data.data.map((event) => {
                let element = {};
                element.title = event.title;
                element.start = new Date(event.start_date);
                element.end = new Date(event.end_date);
                t.push({id:'track-'+(id++),title:event.title,isOpen:false,elements:[element]})
            });

            setTracks(t);
        });
    }, []);
    return (<div><Timeline
        scale={{
            start,
            end,
            zoom,
            zoomMin: MIN_ZOOM,
            zoomMax: MAX_ZOOM,
        }}
        isOpen={open}
        timebar={timebar}
        tracks={tracks}
        now={now}
        enableSticky
        scrollToNow
    /></div>);
}

export default EventsTimelineComp;