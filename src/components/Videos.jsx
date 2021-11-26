import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import useVideoList from "../Hooks/useVideoList";
// import classes from "../styles/Videos.module.css";
import Video from "./Video";

export default function Videos() {
  const [page, setPage] = useState(1);
  const { loading, error, videos, hasMore } = useVideoList(page);

  return (
    <div>
      {/* <div className={classes.videos}> */}
      {videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={hasMore}
          loader="Loading more videos..."
          next={() => setPage(page + 8)}
        >
          {videos.map((video) =>
            video.noq > 0 ? (
              <Link to={`/quiz/${video.youtubeID}`} key={video.youtubeID}>
                <Video
                  title={video.title}
                  id={video.youtubeID}
                  noq={video.noq}
                />
              </Link>
            ) : (
              <Video
                title={video.title}
                id={video.youtubeID}
                noq={video.noq}
                key={video.youtubeID}
              />
            )
          )}
        </InfiniteScroll>
      )}

      {!loading && videos.length === 0 && <div>No data found</div>}
      {error && videos.length === 0 && <div>There was an error</div>}
      {loading && <div>Loading ...</div>}
    </div>
  );
}
