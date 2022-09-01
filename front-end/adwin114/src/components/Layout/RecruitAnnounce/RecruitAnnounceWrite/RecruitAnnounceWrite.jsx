import React, {Component} from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import {CKEditor} from '@ckeditor/ckeditor5-react'

const editorConfiguration = {
    toolbar: ['bold', 'italic']
};

class RecruitAnnounceWrite extends Component {
    render() {
        return (
            <> 
                <div className = "flex bg-[#FFFFFF] justify-center content-center w-screen h-screen" > 
                    <div className="h-[90vh] w-[50%] mt-auto mx-auto">
                        <div className="RecruitAnnounceWrite">
                            <h2>Using CKEditor 5 build in React</h2>
                                <CKEditor
                                    editor={Editor}
                                    data="<p>Hello from CKEditor 5!</p>"
                                    onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        console.log({event, editor, data});
                                    }}
                                    onBlur={(event, editor) => {
                                        console.log('Blur.', editor);
                                    }}
                                    onFocus={(event, editor) => {
                                        console.log('Focus.', editor);
                                    }}/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default RecruitAnnounceWrite;
