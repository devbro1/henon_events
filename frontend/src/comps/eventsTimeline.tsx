import React, { useEffect, useState } from 'react';
import { RestAPI } from 'scripts/api';
import { APIPath} from 'data';
import Timeline from 'react-timelines';
import 'react-timelines/lib/css/style.css'
import { buildTimebar } from './builders';
import { type_options } from '../data';


function EventsTimelineComp() {
    const now = new Date();
    const MIN_ZOOM = 2;
    const MAX_ZOOM = 20;
    const zoom = 2;
    const open = false;
    const timebar = buildTimebar();

    const [events, setEvents] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [start, setStart] = useState(new Date(`2023`));
    const [end, setEnd] = useState(new Date(`2025`));

    useEffect(() => {
        RestAPI.get(APIPath.events.index()).then(({ data }) => {
            setEvents(data.data);
            let t = [];
            let id = 1;
            let min_year = 3000;
            let max_year = 1000;
            data.data.map((event) => {
                let element: any = {};
                element.title = event.title;
                element.start = new Date(event.start_date);
                element.end = new Date(event.end_date);
                element.style={};
                element.style.background = type_options.find((element) => element.title == event.type)?.background;

                t.push({id:'track-'+(id++),title:event.title,isOpen:undefined,elements:[element],tracks:[]})
                min_year = Math.min(min_year,element.start.getFullYear());
                max_year = Math.max(max_year,element.end.getFullYear());
            });

            setTracks(t);
            setStart(new Date(`${min_year}`));
            const num_years = max_year - min_year + 1;
            setEnd(new Date(`${min_year + num_years}`));
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