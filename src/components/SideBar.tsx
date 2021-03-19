import { useEffect, useState } from 'react';
import { GenreResponseProps } from '../App'
import { Button } from '../components/Button';

import { api } from '../services/api';

import '../styles/sidebar.scss';

interface SidebarProps {
  genreId: number,
  onClickGenreId: (id: number) => void
}

export function SideBar({ genreId, onClickGenreId }: SidebarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onClickGenreId(genre.id)}
            selected={genreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}