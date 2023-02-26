import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetPlayer = (page?: number, search?: string) => {
  const [playerList, setPlayerList] = useState<any>();
  const per_page = 20;

  useEffect(() => {
    axios
      .get(
        `https://www.balldontlie.io/api/v1/players?page=${page}&per_page=${per_page}&${
          search ? `search=${search}` : ""
        }`
      )
      .then((res) => setPlayerList(res.data));
  }, [page, search]);

  return { playerList };
};

export default useGetPlayer;
