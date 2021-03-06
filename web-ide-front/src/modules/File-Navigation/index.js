import React, { useState, Fragment } from 'react';
//import * as Routers from "../../routers/IDE-Rotuer";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";//
import "./ContextMenu.css"

import './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectFile, pushOpenFile, setEventState, selectFolder, SELECT_FILE } from '../../actions';
import { EVENT_TYPE } from '../../routers/IDE-Rotuer';

function Directory({ file, tabSize, onClick }) {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();

    return (
        <div className="direcotry-wrapper" style={{ "paddingLeft": tabSize * 10 }}>
            <p onClick={() => { setOpen(!open) }}>
                {open && <img src={require('./images/close.png')} />}
                {!open && <img src={require('./images/open.png')} />}
                {file.name}
                {console.log("File-navigation")}
            </p>

            {open && file.files.map((file, idx) => {
                if (file.isDirectory) {
                    return (
                        <Directory key={idx} file={file} tabSize={tabSize + 1} onClick={onClick}></Directory>
                    );
                }

                return (
                    <p key={idx} style={{ "paddingLeft": tabSize * 10 + 20 }} onClick={() => { onClick(file) }}>{file.name}</p>
                );
            })}

            
        </div>
    );
}


function Folder({ folder, tabSize, onClick }) {
    const [open] = useState(true);
    const dispatch = useDispatch();

    return (
        <div className="direcotry-wrapper" style={{ "paddingLeft": tabSize * 10 }}>
            {open && folder.folders.map((folder, idx) => {
                if (folder.isDirectory) {
                    return (
                        <Folder key={idx} folder={folder} tabSize={tabSize + 1} onClick={onClick}></Folder>
                    );
                }

                return (
                    <p key={idx} style={{ "paddingLeft": tabSize * 10 + 20 }} onClick={() => { onClick(folder) }}>{folder.name}</p>
                );
            })}

            
        </div>
    );
}


function FileNavigation({ }) {
    const [openFilesNavigation, setOpenFilesNavigation] = useState(true);
    const [filesNavigation, setFilesNavigation] = useState(true);
    const { project, openFiles } = useSelector(state => ({
        project: state.project.project, openFiles: state.project.openFiles
    }));

    const dispatch = useDispatch();

    const ID = "ID";
    const IDS = "IDS";

    const handleClick = (event, data) => {
        console.log(`clicked`, { event, data });
    };
    /*
        const attributes = {
            className: "custom-root",
            disabledClassName: "custom-disabled",
            dividerClassName: "custom-divider",
            selectedClassName: "custom-selected"
        };
    */
    return (
        <Fragment>

            <div className="FILE-NAVIGATION">
                <h1 tabIndex="-1" onClick={() => { setOpenFilesNavigation(!openFilesNavigation) }}>Open Files</h1>
                {openFilesNavigation && openFiles.map((file, idx) => {
                    if (file == undefined) {
                    } else {
                        return (
                            <p className="open-file" key={`open-file-${idx}`} onClick={() => { dispatch(pushOpenFile(file)) }}>
                                <span className={["filename", file.modify ? "modify" : ""].join(" ")}>{file.name}</span>
                                <span onClick={(e) => { e.stopPropagation(); dispatch(setEventState(EVENT_TYPE.CLOSE_FILE, file)) }}>x</span>
                            </p>
                        )
                    }
                })}


                <h1 tabIndex="-1" onClick={() => { setFilesNavigation(!filesNavigation) }}>{project.name}</h1>

                <ContextMenuTrigger id={ID}>
                    <div className="file-wrapper">
                        {filesNavigation && project.files.map((file, idx) => {

                            if (file.isDirectory) {
                                return (
                                    <Directory file={file} tabSize={0} key={`directory-idx-${idx}`} onClick={(file) => { dispatch(selectFile(file)) }}></Directory>
                                )
                            }
                            return (
                                <p key={`file-idx-${idx}`} onClick={() => { dispatch(selectFile(file)) }}>{file.name}</p>
                            );
                        })}

                    </div>
                </ContextMenuTrigger>
            </div>


            <ContextMenu id={ID}>
                <MenuItem
                    data={{ action: "CREATE_FILE" }}
                    onClick={(e) => { e.stopPropagation(); dispatch(setEventState(EVENT_TYPE.NEW_FILE)) }}
                >
                    새파일
            </MenuItem>
                <MenuItem
                    data={{ action: "CREATE_FOLDER" }}
                    onClick={(e) => { e.stopPropagation(); dispatch(setEventState(EVENT_TYPE.NEW_FOLDER)) }}
                >
                    새폴더
            </MenuItem>
                <MenuItem
                    data={{ action: "RENAME" }}
                    onClick={(e) => { e.stopPropagation(); dispatch(setEventState(EVENT_TYPE.RENAME_FILE)) }}
                >
                    이름 바꾸기
            </MenuItem>
                <MenuItem
                    data={{ action: "DELETE" }}
                    onClick={(e) => { e.stopPropagation(); dispatch(setEventState(EVENT_TYPE.DROP_FILE)) }}
                >
                    삭제
            </MenuItem>
            </ContextMenu>
        </Fragment>
    );
}

export default FileNavigation;