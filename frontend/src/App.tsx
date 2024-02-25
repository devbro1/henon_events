import React, { Suspense, useContext, useEffect } from 'react';
import { useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import './App.css'

const AddEventComp = React.lazy(() => import('./comps/addEvent'));
const EventsListComp = React.lazy(() => import('./comps/eventsList'));
const EventsTimelineComp = React.lazy(() => import('./comps/eventsTimeline'));

function App() {
  const location = useLocation();
  console.log(location.pathname.indexOf(''));
  const selected = "inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white";
  const not_selected = "inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3";
  return (
    <div>
      <div className="">
        <ul className="flex">
          <li className="mr-3"><Link to={'/add-event/'} className={location.pathname.indexOf('add-event') > 0 ? selected: not_selected}>Add Event</Link></li>
          <li className="mr-3"><Link to={'/events-list/'} className={location.pathname.indexOf('events-list') > 0 ? selected: not_selected}>Events List</Link></li>
          <li className="mr-3"><Link to={'/events-timeline/'} className={location.pathname.indexOf('events-timeline') > 0 ? selected: not_selected}>Events Timeline</Link></li>
        </ul>
      </div>
      <div>
        <Routes>
          <Route path={'/add-event/*'} element={<AddEventComp />} />
          <Route path={'/events-list/*'} element={<EventsListComp />} />
          <Route path={'/events-timeline/*'} element={<EventsTimelineComp />} />
          <Route path={'/'} element={<div>Welcome</div>} />
          <Route path={'*'} element={<div>NOT FOUND</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
