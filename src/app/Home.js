import React, { useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from "@material-ui/core/styles";
import { Categories, UploadDialog } from "./home/";
import { useQuery } from "@apollo/client";
import { FETCH_CATEGORIES } from "./home/graphql";

const useStyles = makeStyles(() => ({
    uploadButton: {
        margin: "1rem",
        fontSize: "1rem",
    }
}));

const Home = () => {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);

    const { data, loading, error } = useQuery(FETCH_CATEGORIES);
    const categories = data?.categoryResolver || [];

    return (
        error && <div>Something went wrong fetching the data :(</div> ||
        loading && <CircularProgress /> || (
            <>
                <Button
                    color="primary"
                    variant="contained"
                    endIcon={<CloudUploadIcon />}
                    className={classes.uploadButton}
                    onClick={() => setDialogOpen(true)}
                >
                    Upload
                </Button>
                <Categories categories={categories} />
                <UploadDialog open={dialogOpen} setOpen={setDialogOpen} categories={categories} />
            </>
        )
    );
};

export default Home;
