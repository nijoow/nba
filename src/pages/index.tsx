import Head from "next/head";
import useGetPlayer from "@/hooks/useGetPlayer";
import { FaFolder } from "react-icons/fa";
import { useRef, useState } from "react";
import ScoreApp from "@/components/ScoreApp";
import Draggable from "react-draggable";
import CurrentDate from "@/components/CurrentDate";

export default function Home() {
  const [openScore, setOpenScore] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const trackPos = (data: any) => {
    setPosition((state) => ({ x: data.x, y: data.y }));
  };
  const [opacity, setOpacity] = useState(false);

  const handleStart = () => {
    setOpacity(true);
  };
  const handleEnd = () => {
    setOpacity(false);
  };

  return (
    <>
      <Head>
        <title>NBA Web</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-screen overflow-hidden bg-[center_bottom] bg-cover bg-image">
        <CurrentDate />
        <Draggable
          bounds="parent"
          positionOffset={{ x: 30, y: 30 }}
          position={position}
          onDrag={(e, data) => trackPos(data)}
          onStart={handleStart}
          onStop={handleEnd}
        >
          <div className="absolute flex flex-col items-center cursor-pointer w-fit">
            <FaFolder
              size={84}
              className="text-sky-300"
              opacity={opacity ? 0.6 : 1}
              onDoubleClick={() => setOpenScore(true)}
            />
            <span className="text-sm text-white -translate-y-1">
              Score Board
            </span>
          </div>
        </Draggable>
        {openScore && <ScoreApp setOpenScore={setOpenScore} />}
      </div>
    </>
  );
}
