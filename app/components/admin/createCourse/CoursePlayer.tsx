import axios from "axios";
import React, { FC, useEffect, useState } from "react";

type Props = {
  videoUrl: any;
  title: any;
};

const CoursePlayer: FC<Props> = ({ videoUrl,}) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });


  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URI}/getVideoOtp`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);
  return (
    <div style={{ paddingTop: "41%", position: "relative" ,overflow:'hidden'}}>
      {videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=aj14LjhTiUZnYNIL`}
          style={{
            border: 0,
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0",

            width: "100%",
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
