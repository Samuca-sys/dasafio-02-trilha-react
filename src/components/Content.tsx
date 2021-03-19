import { useEffect, useState } from 'react';
import { GenreResponseProps } from '../App'
import { MovieCard } from '../components/MovieCard';

import { api } from '../services/api';

import '../styles/content.scss';

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  genreId: number
}

export function Content({ genreId }: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  //const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${genreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${genreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [genreId]);

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:
          <span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  )
}