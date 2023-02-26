import { AllGamesResponse } from "@/types/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetAllGames = (date: string, page?: number) => {
  const [gameList, setGameList] = useState<AllGamesResponse>();
  const per_page = 20;

  useEffect(() => {
    axios
      .get(
        `https://www.balldontlie.io/api/v1/games?page=${page}&per_page=${per_page}&dates[]=${date}`
      )
      .then((res) => setGameList(res.data));
  }, [page, date]);

  return { gameList };
};

export default useGetAllGames;
