import React from 'react';
const HwSubmission = (props) => {
    if(props.state === "submission")
        return <span className = "submission">제출</span>
    else
    return <span className = "not_submission">미제출</span>
};
export default HwSubmission;
