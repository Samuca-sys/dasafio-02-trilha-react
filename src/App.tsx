import { useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar genreId={selectedGenreId} onClickGenreId={handleClickButton} />
      <Content genreId={selectedGenreId} />
    </div>
  )
}