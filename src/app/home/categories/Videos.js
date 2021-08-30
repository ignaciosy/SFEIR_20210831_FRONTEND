import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    title: {
        fontSize: "2rem",
        marginBottom: "0.3rem"
    },
    container: {
        height: "35vh",
        minWidth: "40vw",
        maxWidth: "90%"
    },
    list: {
        display: "flex",
        flexWrap: "wrap"
    },
    item: {
        flexGrow: 1,
        margin: "0.8rem"
    }
});

const Videos = ({ videos = [] }) => {
    const classes = useStyles();

    return <div className={classes.list}>{videos?.map(video => (
        <div key={`video-${video.id}`} className={classes.item}>
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
        </div>
    ))}</div>;
};

export default Videos;
