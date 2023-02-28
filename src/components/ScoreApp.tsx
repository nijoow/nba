import useGetAllGames from "@/hooks/useGetAllGames";
import { dateToISO } from "@/utils/getDate";
import React, { Dispatch, SetStateAction, useState } from "react";
import Draggable from "react-draggable";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaFolder, FaCaretLeft, FaCaretRight } from "react-icons/fa";

const today = new Date();

const ScoreApp = ({
  setOpenScore,
}: {
  setOpenScore: Dispatch<SetStateAction<boolean>>;
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const { gameList, loading } = useGetAllGames(dateToISO(date));

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const trackPos = (data: { x: number; y: number }) => {
    setPosition({ x: data.x, y: data.y });
  };
  const [opacity, setOpacity] = useState(false);
  return (
    <Draggable
      defaultPosition={{ x: 20, y: 20 }}
      onDrag={(e, data) => trackPos(data)}
    >
      <div className="flex flex-col w-full max-w-md overflow-hidden rounded-md">
        <div className="w-full h-5 bg-gray-200 flex justify-start gap-2 items-center px-1.5 ">
          <div
            className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
            onClick={() => setOpenScore(false)}
          ></div>
          <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer"></div>
        </div>
        <div className="bg-gray-100 min-h-[400px] flex items-center flex-col p-4">
          <div className="flex items-center gap-2">
            <button
              className="p-2"
              onClick={() =>
                setDate(
                  new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate() - 1
                  )
                )
              }
            >
              <FaCaretLeft />
            </button>
            <div>{date.getFullYear()}.</div>
            <div>{date.getMonth() + 1}.</div>
            <div>{date.getDate()}.</div>{" "}
            <button
              className="p-2"
              onClick={() =>
                setDate(
                  new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate() + 1
                  )
                )
              }
            >
              <FaCaretRight />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center flex-auto w-full gap-2 ">
            {loading ? (
              <div>
                <AiOutlineLoading3Quarters className="animate-spin" size={40} />
              </div>
            ) : (
              gameList &&
              gameList.data.map((game) => {
                const winner =
                  game.home_team_score > game.visitor_team_score
                    ? "home"
                    : "visitor";
                return (
                  <div
                    className="flex flex-col gap-0.5 items-center "
                    key={game.id}
                  >
                    {game.status === "Final" ? "" : game.status.slice(0, 8)}
                    <div className="flex gap-3">
                      <span className="font-semibold">
                        {game.home_team.abbreviation}
                      </span>
                      {game.status === "Final" && (
                        <span
                          className={`font-semibold ${
                            winner === "home"
                              ? "text-orange-600"
                              : "text-gray-400"
                          }`}
                        >
                          {game.home_team_score}
                        </span>
                      )}
                      <span>vs</span>
                      {game.status === "Final" && (
                        <span
                          className={`font-semibold ${
                            winner === "visitor"
                              ? "text-orange-600"
                              : "text-gray-400"
                          }`}
                        >
                          {game.visitor_team_score}
                        </span>
                      )}
                      <span
                        className="font-semibold"
                        data-tooltip-target="tooltip-visitor"
                      >
                        {game.visitor_team.abbreviation}
                      </span>
                      <div
                        role="tooltip"
                        id="tooltip-visitor"
                        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                      >
                        {game.visitor_team.name}
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default ScoreApp;
