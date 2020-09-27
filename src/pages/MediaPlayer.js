import React from 'react';
import { useSelector } from 'react-redux';
import ReactHlsPlayer from 'react-hls-player';
// MUI
import Box from '@material-ui/core/Box';

const MediaPlayer = () => {
  const streamURL = useSelector((state) => state.media.streamURL);

  return (
    <div style={{ flexGrow: 1 }}>
      <ReactHlsPlayer
        url={streamURL}
        autoplay={true}
        controls={true}
        width='100%'
        height='780'
      />
      <Box align='center' marginTop='10px'>
        Comment section is disabled
      </Box>
    </div>
  );
};

export default MediaPlayer;
