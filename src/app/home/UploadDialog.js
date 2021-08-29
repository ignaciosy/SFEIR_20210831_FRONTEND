import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    MenuItem,
    CircularProgress
} from "@material-ui/core";
import Dropzone from "./upload_dialog/Dropzone";
import { useMutation } from "@apollo/client";
import { UPLOAD_VIDEO, FETCH_CATEGORIES } from "./graphql";

const useStyles = makeStyles(() => ({
    categories: {
        width: "30%"
    },
    verticalSpacing: {
        marginBottom: "0.5rem"
    },
    title: {
        backgroundColor: "lightblue"
    }
}));

const UploadDialog = ({ open, setOpen, categories }) => {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [selectedCategoryId, setselectedCategoryId] = useState('');
    const [files, setFiles] = useState(null);

    const [uploadVideo, { data, loading, error }] = useMutation(UPLOAD_VIDEO, {
        context: { hasUpload: true },
        refetchQueries: [FETCH_CATEGORIES]
    });

    const handleClose = () => {
        setTitle('');
        setselectedCategoryId('');
        setFiles(null);
        setOpen(false);
    };

    const handleUpload = async () => {
        await uploadVideo({ variables: { input: { title, categoryId: selectedCategoryId, clip: files[0] } } });
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth={true}
        >
            <DialogTitle className={classes.title}>Upload a new video</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    label="Title *"
                    type="text"
                    fullWidth
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    className={classes.verticalSpacing}
                />
                <FormControl className={clsx(classes.categories, classes.verticalSpacing)}>
                    <InputLabel>Category *</InputLabel>
                    <Select
                        value={selectedCategoryId}
                        onChange={event => setselectedCategoryId(event.target.value)}
                    >
                        {categories?.map(category => <MenuItem key={`menu-${category.id}`} value={category.id}>{category.name}</MenuItem>)}
                    </Select>
                    <FormHelperText>Pick one</FormHelperText>
                </FormControl>
                <Dropzone files={files} setFiles={setFiles} />
            </DialogContent>
            <DialogActions>
                <Button disabled={loading} color="secondary" onClick={handleClose}>Cancel</Button>
                <Button
                    color="primary"
                    onClick={handleUpload}
                    disabled={loading || !(title && selectedCategoryId && files)}
                    endIcon={loading && <CircularProgress />}
                >Upload</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UploadDialog;
