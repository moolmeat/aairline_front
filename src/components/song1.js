import React, { useState, useEffect } from 'react';
import { getMusicUrl } from '../service/musicService';

const Song1 = ({ fileName }) => {
  const [musicUrl, setMusicUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const url = await getMusicUrl(fileName);
        setMusicUrl(url);
      } catch (error) {
        setError('음원을 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, [fileName]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{fileName}</h2>
      {musicUrl && (
        <audio controls>
          <source src={musicUrl} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default Song1;
