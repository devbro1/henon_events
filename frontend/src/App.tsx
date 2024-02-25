import React, { Suspense, useContext, useEffect } from 'react';
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import './App.css'

const AddEventComp = React.lazy(() => import('./comps/addEvent'));
const EventsListComp = React.lazy(() => import('./comps/eventsList'));
const EventsTimelineComp = React.lazy(() => import('./comps/eventsTimeline'));

function App() {
  const selected = "border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white";
  const not_selected = "inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3";
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      
      <div className="">
          <div className={selected} ><Link to={'/add-event/'}>Add Event</Link></div>
          <div className={not_selected} ><Link to={'/events-list/'}>Events List</Link></div>
          <div className={not_selected} ><Link to={'/events-timeline/'}>Events Timeline</Link></div>
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
