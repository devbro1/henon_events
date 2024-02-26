import React, { Suspense, useContext, useEffect } from 'react';
import { useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEventComp = React.lazy(() => import('./comps/addEvent'));
const EventsListComp = React.lazy(() => import('./comps/eventsList'));
const EventsTimelineComp = React.lazy(() => import('./comps/eventsTimeline'));

function App() {
  const location = useLocation();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false, staleTime: 30 * 60 * 1000, networkMode: 'always' },
      mutations: {
        networkMode: 'always',
      },
    },
  });

  const selected = "inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white";
  const not_selected = "inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3";
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <ToastContainer />
        <div className="">
          <ul className="flex">
            <li className="mr-3"><Link to={'/add-event/'} className={location.pathname.indexOf('add-event') > 0 ? selected : not_selected}>Add Event</Link></li>
            <li className="mr-3"><Link to={'/events-list/'} className={location.pathname.indexOf('events-list') > 0 ? selected : not_selected}>Events List</Link></li>
            <li className="mr-3"><Link to={'/events-timeline/'} className={location.pathname.indexOf('events-timeline') > 0 ? selected : not_selected}>Events Timeline</Link></li>
          </ul>
        </div>
        <div>
          <Routes>
            <Route path={'/add-event/*'} element={<AddEventComp />} />
            <Route path={'/events-list/*'} element={<EventsListComp />} />
            <Route path={'/events-timeline/*'} element={<EventsTimelineComp />} />
            <Route path={'/'} element={<Navigate to='/add-event/' />} />
            <Route path={'*'} element={<div>NOT FOUND</div>} />
          </Routes>
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default App
