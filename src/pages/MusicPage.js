import React from 'react';
import Song1 from '../components/song1';

const MusicPage = () => {
  const songs = ['230330 AAIRLINE 시선의 파랑 MASTERED INST (48k24b).wav'];

  return (
    <div>
      <h1>음악 목록</h1>
      {songs.map((song, index) => (
        <Song1 key={index} fileName={song} />
      ))}
    </div>
  );
};

export default MusicPage;
