import React from "react";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Videos } from "./categories/";

const useStyles = makeStyles({
    card: {
        margin: "2rem",
        backgroundColor: "lightcyan",
    },
    cardHeader: {
        borderBottom: "1px solid grey"
    }
});

const Categories = ({ categories }) => {
    const classes = useStyles();


    return categories?.map(category => (
        <Card
            key={`category-${category.id}`}
            variant="outlined"
            className={classes.card}
        >
            <CardHeader title={category.name} className={classes.cardHeader} />
            <CardContent>
                <Videos videos={category.videos} />
            </CardContent>
        </Card>
    ));
};

export default Categories;
