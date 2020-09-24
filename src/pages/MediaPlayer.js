import React from 'react';
import ReactHlsPlayer from 'react-hls-player';

const MediaPlayer = () => {
  const url =
    'https://d1skl3nys4912k.cloudfront.net/elastic-transcoder/hls/b00425056f25d02b4002bfb5d44d351113d0a9001e4c585c01f9189f892b1ed6_74588/hls_b00425056f25d02b4002bfb5d44d351113d0a9001e4c585c01f9189f892b1ed6_74588.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kMXNrbDNueXM0OTEyay5jbG91ZGZyb250Lm5ldC9lbGFzdGljLXRyYW5zY29kZXIvaGxzL2IwMDQyNTA1NmYyNWQwMmI0MDAyYmZiNWQ0NGQzNTExMTNkMGE5MDAxZTRjNTg1YzAxZjkxODlmODkyYjFlZDZfNzQ1ODgvaGxzX2IwMDQyNTA1NmYyNWQwMmI0MDAyYmZiNWQ0NGQzNTExMTNkMGE5MDAxZTRjNTg1YzAxZjkxODlmODkyYjFlZDZfNzQ1ODgubTN1OCIsIkNvbmRpdGlvbiI6eyJJcEFkZHJlc3MiOnsiQVdTOlNvdXJjZUlwIjoiOjoxLzMyIn0sIkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjAwOTM1MTc2fX19XX0_&Signature=GP--UR3NRCTaBW3X8RfRknLHtIpdFXLqtkOrnQ~~~gs~0wvJn1kmm03eL67lEG--2d5uzAwhgL61EL3TEfmQWjBUI3gPg-EmuTI3zvfYQme2Vq9xFxE30m6oXh3OxyP60tcPhkYJfQNBoQSrMk54uu-4UJDAYX1coqPw-ipXeGhj3FJkVUsDUGo0Q1UPMiANkCMpdJfVzxSB27sI6lwpumSVMAwdCCjiCXtLKqnVyRe~B3Hg0iVqiARnEvXiEgUHx5DX3A~HWXkzUSgPPoyhUUD8bshj6YMv6p9dugH~veoGT1DbpQvhoH-wXtqzH0KoZKyMVuX2mqXWPpBkM~bxEw__&Key-Pair-Id=APKAJMWWKBWWCNLKAYTQ';
  return (
    <div>
      <ReactHlsPlayer
        url={url}
        autoplay={false}
        controls={true}
        width='100%'
        height='auto'
      />
    </div>
  );
};

export default MediaPlayer;
