import React from "react";
import clsx from "clsx";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    title: {
        fontSize: "2rem",
        marginBottom: "0.3rem"
    },
    container: {
        width: "50vw",
        height: "40vh",
        marginBottom: "0.8rem"
    }
});

const Videos = ({ videos = [] }) => {
    const classes = useStyles();

    return <ul>{videos?.map(video => (
        <li key={`video-${video.id}`}>
            <div className={classes.title}>{video.title}</div>
            <div className={classes.container}>
                <video
                    className="video-js vjs-fill"
                    controls
                    preload="auto"
                    width="100%"
                    height="100%"
                    // poster="MY_VIDEO_POSTER.jpg"
                    data-setup="{'fluid': true}"
                >
                    <source src={`http://localhost:3001${video.url}`} type="video/mp4" />
                </video>
            </div>
        </li>
    ))}</ul>;
};

export default Videos;
