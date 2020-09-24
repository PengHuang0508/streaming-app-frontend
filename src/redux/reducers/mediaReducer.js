import { SET_MEDIA_LIST, SET_STREAM_URL } from '../types';

const initialState = {
  mediaList: [],
  streamURL: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MEDIA_LIST:
      return {
        ...state,
        mediaList: action.payload,
      };

    case SET_STREAM_URL:
      return {
        ...state,
        streamURL: action.payload,
      };
    default:
      return state;
  }
}

// {
//   media_key: '124321432423423467',
//   title: 'Descriptive title here',
//   description: 'Informative description here.',
//   duration: '12:34:00',
//   width: '720',
//   height: '520',
//   created_at: '2020-09-22 21:24:20',
//   min_permission: 'free',
// },
// {
//   media_key: '124321432423423467',
//   title: 'Descriptive title here',
//   description: 'Informative description here.',
//   duration: '12:34:00',
//   width: '720',
//   height: '520',
//   created_at: '2020-09-22 21:24:19',
//   min_permission: 'free',
// },
// {
//   media_key: '124321432423423467',
//   title: 'Descriptive title here',
//   description: 'Informative description here.',
//   duration: '12:34:00',
//   width: '720',
//   height: '520',
//   created_at: '2020-09-22 21:24:17',
//   min_permission: 'free',
// },
// {
//   media_key: '124321432423423467',
//   title: 'Descriptive title here',
//   description: 'Informative description here.',
//   duration: '12:34:00',
//   width: '720',
//   height: '520',
//   created_at: '2020-09-22 21:24:12',
//   min_permission: 'premium',
// },
// {
//   media_key: '124321432423423467',
//   title: 'Descriptive title here',
//   description: 'Informative description here.',
//   duration: '12:34:00',
//   width: '720',
//   height: '520',
//   created_at: '2020-09-22 21:24:11',
//   min_permission: 'premium',
// },
// {
//   media_key: '124321432423423467',
//   title: 'Descriptive title here',
//   description: 'Informative description here.',
//   duration: '12:34:00',
//   width: '720',
//   height: '520',
//   created_at: '2020-09-22 21:24:09',
//   min_permission: 'premium',
// },
// {
//   media_key: '124321432423423467',
//   title: 'Descriptive title here',
//   description: 'Informative description here.',
//   duration: '12:34:00',
//   width: '720',
//   height: '520',
//   created_at: '2020-09-22 21:24:08',
//   min_permission: 'premium',
// },
// {
//   media_key: '124321432423423467',
//   title: 'Descriptive title here',
//   description: 'Informative description here.',
//   duration: '12:34:00',
//   width: '720',
//   height: '520',
//   created_at: '2020-09-22 21:24:06',
//   min_permission: 'premium',
// },
