import React from "react";
import Editor from "write/Editor";
import Responsive from 'components/common/Responsive';
import WriteActionButtons from "write/WriteActionButtons";

const Write = () => {
    return (
        <Responsive>
            <Editor />
            <WriteActionButtons />
        </Responsive>
    );
};

export default Write;