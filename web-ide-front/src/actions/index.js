export const SET_EVENT_STATE = "@SET_EVENT_STATE";

export function setEventState(eventType, additional) {
    return {
        type: SET_EVENT_STATE, eventType, additional
    }
}

export const SET_PROJECT = "@SET_PROEJCT";
export const PUSH_OPEN_FILE = "@PUSH_OPEN_FILE";
export const REMOVE_OPEN_FILE = "@REMOVE_OPEN_FILE";
export const DROP_FILE = "@DROP_FILE";
export const RENAME_FILE = "@RENAME_FIME";
export const SELECT_FILE = "@SELECT_FILE";
export const SET_OPEN_FILES = "@SET_OPEN_FILES"
export const PUSH_OPEN_FOLDER = "@PUSH_OPEN_FOLDER"
export const RESET_PROJECT = "@RESET_STATE";

export function setProject(project) {
    return { type: SET_PROJECT, project }
}

export function pushOpenFile(file) {
    return { type: PUSH_OPEN_FILE, file };
}

export function removeOpenFile(file) {
    return { type: REMOVE_OPEN_FILE, file };
}
export function dropFile(file) { 
    return { type: DROP_FILE, file };
}
export function renameFile(file) {
    return { type: RENAME_FILE, file };
}

export function selectFile(file) {
    return { type: SELECT_FILE, file };
}

export function setOpenFiles(files) {
    return { type: SET_OPEN_FILES, files};
}

export function resetProject() {
    return { type: RESET_PROJECT };
}