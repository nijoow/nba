import { AllGamesResponse } from "@/types/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetAllGames = (date: string, page?: number) => {
  const [gameList, setGameList] = useState<AllGamesResponse>();
  const [loading, setLoading] = useState(false);
  const per_page = 20;

  useEffect(() => {
    getAllGames(date, page);
  }, [page, date]);

  const getAllGames = async (date: string, page?: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.balldontlie.io/api/v1/games?page=${page}&per_page=${per_page}&dates[]=${date}`
      );
      setGameList(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return { gameList, loading };
};

export default useGetAllGames;
