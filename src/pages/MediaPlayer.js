import React from 'react';
import { useSelector } from 'react-redux';
import ReactHlsPlayer from 'react-hls-player';

const MediaPlayer = () => {
  const streamURL = useSelector((state) => state.media.streamURL);
  console.log('streamURL', streamURL);
  return (
    <div style={{ flexGrow: 1 }}>
      <ReactHlsPlayer
        url={streamURL}
        autoplay={true}
        controls={true}
        width='100%'
        height='780'
      />
    </div>
  );
};

export default MediaPlayer;
