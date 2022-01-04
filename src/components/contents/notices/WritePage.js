import React from "react";
import Editor from "../../write/Editor";
import Responsive from "../../common/Responsive";
import WriteActionButtons from "../../write/WriteActionButtons";

const WritePage = () => {
    return (
        <Responsive>
            <Editor />
            <WriteActionButtons />
        </Responsive>
    );
};

export default WritePage;