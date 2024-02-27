import React, { useContext, useState } from 'react';
import { APIPath, RoutePath } from 'data';
import { Link } from 'react-router-dom';
import { Styles } from './list.styles';
import { Patient } from 'types';
import { DataTableComp, tablePropsProvider } from 'helperComps';
// import { patient_statuses } from 'data/options';
// import { SelectComp } from 'src/utils/index';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
// import { DateRangePicker } from 'react-date-range';
// import { Popover } from '@headlessui/react';
// import { GlobalContext } from 'context';

function EventsListComp() {

    let column = [
        {
            title: 'event ID',
            field: 'id',
            value: (row) => (row.id),
            filter: true,
            className: 'w-12',
        },
        {
            title: 'Title',
            sortable: true,
            field: 'title',
            value: (row) => row.title,
            filter: true,
            className: 'w-48',
        },
        {
            title: 'Type',
            sortable: true,
            field: 'type',
            value: (row) => row.type,
            filter: true,
            className: 'w-48',
        },
        {
            title: 'Start Date',
            sortable: true,
            field: 'start_date',
            value: (row) => row.start_date,
            filter: false,
            className: 'w-48',
        },
        {
            title: 'End Date',
            sortable: true,
            field: 'end_date',
            value: (row) => row.end_date,
            filter: false,
            className: 'w-48',
        },
    ];

    
    return (<div className={Styles.root}>
        <DataTableComp {...tablePropsProvider(APIPath.events.index())} columns={column} />
    </div>);
}

export default EventsListComp;