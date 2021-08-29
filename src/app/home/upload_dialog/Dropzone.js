import React from "react";
import { useDropzone } from 'react-dropzone'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    container: {
        border: "1px lightgrey solid",
        padding: "0.5rem"
    },
    innerText: {
        color: "grey",
        padding: "auto",
        textAlign: "center"
    },
    dropzone: {
        border: "1px grey dotted",
        backgroundColor: "lightgrey"
    }
}));


const Dropzone = ({ files, setFiles }) => {
    const classes = useStyles();

    const handleClose = () => {
        setTitle('');
        setCategory('');
        setFiles(null);
        setOpen(false);
    };

    const handleUpload = () => {
        console.log("upload!!");
        handleClose();
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'video/mp4, video/mov',
        maxFiles: 1,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    return (
        <section className={classes.container}>
            <div {...getRootProps({ className: classes.dropzone })}>
                <input {...getInputProps()} />
                <p className={classes.innerText}>Drag 'n' drop your video here, or click to select</p>
            </div>
            {files?.map(file => <div key={`file-${file.name}`}>{file.name}</div>)}
        </section>
    )
}

export default Dropzone;
