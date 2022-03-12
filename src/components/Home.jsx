import "./Home.css";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Howl, Howler } from "howler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faForward } from "@fortawesome/free-solid-svg-icons";
export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [musicPlaying, setMusic] = useState(false);
  const [defaultPlay, setPlay] = useState(null);

  const fetchData = () => {
    fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/studiod9c0baf.json"
    )
      .then((res) => res.json())
      .then((res) => {
        setPosts(res);
        setPlay(res[0].url);
      })
      .catch((err) => {
        console.log("ERROR " + err.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const playMusic = (url) => {
    console.log(url);
    var sound = new Howl({
      src: [url],
      html5: true,
      preload: true,
    });
    if (musicPlaying === true) {
      Howler.stop();
      setMusic(false);
      return;
    }
    sound.play();
    setMusic(true);
  };
  return (
    <>
      <div id="poster">
        {/* <img
          src="http://hck.re/kWWxUI"
          alt=""
          srcset=""
          width={"100%"}
          height={"500px"}
        /> */}
        <div>.</div>
        <div id="exotic-song">PLAY EXOTIC SONGS</div>
        <div id="like-song">PLAY SONGS THAT YOU LIKE</div>
        <div id="btn-container-poster">
          <div>Play Music</div>
          {musicPlaying == false ? (
            <button id="plyBtn" onClick={() => playMusic(defaultPlay)}>
              <FontAwesomeIcon icon={faPlay} />
            </button>
          ) : (
            <button id="stpBtn" onClick={() => playMusic(defaultPlay)}>
              <FontAwesomeIcon icon={faStop} />
            </button>
          )}
        </div>
      </div>
      <div className="songs-container">
        {posts.map((d) => (
          <>
            <div className="song-cont" key={nanoid()}>
              {" "}
              <img src={d.cover_image} alt="Image Not Found" />
              <div>Song Name: {d.song}</div>
              <div>Artists: {d.artists}</div>
              {musicPlaying === d.url ? (
                <>
                  <audio
                    src={musicPlaying}
                    width="750"
                    height="500"
                    controls
                  ></audio>
                  <br />
                  <button onClick={() => setMusic(null)} id="stop-Btn">
                    Stop Song
                  </button>
                </>
              ) : (
                <button onClick={() => setMusic(d.url)} id="play-Btn">
                  Play Song
                </button>
              )}
            </div>
          </>
        ))}
      </div>
    </>
  );
};
