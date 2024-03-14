import React, { useEffect, useState } from "react";
import { QueryConfig, Result } from "../../type/result";
import getMovie from "../../apis/movie.api";
import Button from "../../components/Button";

const MovieList = () => {
  const [movie, setMovie] = useState<Result[]>([]);

  const queryConfig: QueryConfig = {
    language: "en-US",
    page: 1,
    api_key: "5ed1c2c527ce1fce068c95a7948d9988",
  };
  useEffect(() => {
    getMovie
      .nowPlaying(queryConfig)
      .then((res) => {
        setMovie(res.data.results as Result[]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [] );

  console.log(movie);

  const Convert = (className: string, modifier: string) => {
    const result = `${className} ${className}-${modifier}`;

    return result;
  }
  Convert("hello", "world");
  console.log(Convert("hello", "world"));

  return (
    <div>
      MovieList
      <Button className="button" modifier="red">Sign in</Button>
      <Button className="button" >Sign in</Button>
      <div className="button">clss</div>

    </div>
  );
};

export default MovieList;
