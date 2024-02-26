import _ from 'lodash';

type APIParam = string | number;

// api call urls list
// all backend used apis
export const __APIPath = {
    events: {
        index: (id?: APIParam) => `${import.meta.env.VITE_APP_API}events/${id ? id : ''}`,
    },
};
