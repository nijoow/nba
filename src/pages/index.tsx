import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import useGetPlayer from "@/hooks/useGetPlayer";
import useGetAllGames from "@/hooks/useGetAllGames";
import { dateToISO } from "@/utils/getDate";
import { FaFolder } from "react-icons/fa";
const inter = Inter({ subsets: ["latin"] });
const today = new Date();
export default function Home() {
  const { playerList } = useGetPlayer();
  const { gameList } = useGetAllGames(dateToISO(today));
  // console.log(gameList);
  // console.log(playerList);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-screen">
        <FaFolder size={84} className="text-sky-300 " />
        <div className="flex flex-col w-full max-w-md rounded-md overflow-hidden">
          <div className="w-full h-5 bg-gray-200 flex justify-start gap-2 items-center px-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          </div>
          <div className="bg-gray-100">
            {gameList &&
              gameList.data.map((game) => (
                <div key={game.id}>
                  {game.home_team.abbreviation} vs{" "}
                  {game.visitor_team.abbreviation}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
