import React, {useState, useEffect} from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5/build/ckeditor';
import { useNavigate, useParams } from 'react-router-dom';
import { API_ORIGIN } from "components/APIRequest/APIRequest";
import axios from 'axios';

const AREA_DATA = [
    { id: null, value: '지역을 선택해주세요' },
    { id: '서울', value: '서울' },
    { id: '경기', value: '경기' },
    { id: '인천', value: '인천' },
    { id: '강원', value: '강원' },
    { id: '충청', value: '충청' },
    { id: '전라', value: '전라' },
    { id: '경상', value: '경상' },
    { id: '제주', value: '제주' },
    ];

const RECRUIT_TYPE_DATA = [
    { id: null, value: '모집 유형을 선택해주세요' },
    { id: "SalesPerson", value: '직원' },
    { id: "TeamLeader", value: '팀장' },
    { id: "Director", value: '본부장' },
    { id: "General", value: '총괄' },
    { id: "Agency", value: '대행사' },
    ];

function changeRecruitTypeValueToId (_value) {
    return RECRUIT_TYPE_DATA.filter(el => el.value === _value)[0]?.id; 
}
    
export default function RecruitAnnounceWrite() {
    let navigate = useNavigate();
    const {post_id} = useParams();

    const [selectedAreaValue, setSelectedAreaValue] = useState(
        '지역'
    );
    const [selectedRecruitTypeValue, setSelectedRecruitTypeValue] = useState(
        '정렬'
    );
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    
    const handleDropArea = (e) => {
        const {value} = e.target;
        setSelectedAreaValue(AREA_DATA.filter(el => el.value === value)[0].id);
        console.log(selectedAreaValue)
    };

    const handleDropRecruitType = (e) => {
        console.log(e.target);
        const {value} = e.target;
        setSelectedRecruitTypeValue(value)
        console.log(selectedRecruitTypeValue)
    };

    const handleChangeContent = (e) => {
        setContent(e.getData());
        console.log("content", content);
    };

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
        console.log("title", title);
    };

    const handelCancleButton = (e) => {
        if (window.confirm("정말 취소합니까?")) {
            navigate('/recruit-announce');
          }
    };
    const [response, setResponse] = useState("");
    const [error, setError] = useState(null);
    const handleSummbitButton = (e) =>{
        if (window.confirm("제출 하시겠습니까?")) {
            let post = {
                title: title,
                content: content,
                area: selectedAreaValue,
                recruit_type: changeRecruitTypeValueToId(selectedRecruitTypeValue),
                user_id : "63033dc1f7c78b7416dce005"
              };
            console.log(post);
            if (post.area === null || post.recruit_type === null){
                alert("지역과 모집 유형을 선택해주세요.");
                return null;
            } else if (post.title === ""){
                alert("제목을 입력해주세요.");
                return null;
            } else if (post.content === ""){
                alert("내용 입력해주세요.");
                return null;
            }
            
            const fetctPatchPost = async () => {
                try {
                    setError(null);
                    const API_URI = `${API_ORIGIN}/posts/${post_id}`
                    setResponse(await axios.patch(API_URI, post))
                    // console.log(response);
                } catch (e) {
                    setError(e);
                    alert(e.response.data.detail[0].msg);
                }

            };
            fetctPatchPost();
            navigate(`/recruit-announce/${post_id}`); 
          }
    };

    const fetctGetPost = async () => {
        try {
            setError(null);
            const API_URI = `${API_ORIGIN}/posts/${post_id}`
            const response = await axios.get(API_URI);
            response.data.recruit_type = RECRUIT_TYPE_DATA.filter(el => el.id === response.data.recruit_type)[0].value;
            setTitle(response.data.title);
            setContent(response.data.content);
            setSelectedAreaValue(response.data.area);
            setSelectedRecruitTypeValue((response.data.recruit_type));
        } catch (e) {
            setError(e);
        }
        
    };

    useEffect(() => {
        fetctGetPost();
    // eslint-disable-next-line
    }, []);


    return (
<> 
    <div className = "bg-[#FFFFFF] justify-center content-center w-screen h-screen overflow-scroll" > 
        <div className="flex h-[90vh] w-[50vw] sm:mt-[5vh] lg:mt-[11vh] justify-center content-center mx-auto overflow-scroll">
            <div className="flex flex-col w-full h-full gap-6">
                <div className='flex flex-col md:flex-row justify-between whitespace-nowrap'>
                    <div className='flex flex-row w-full'>
                        <label htmlFor="title" className="text-2xl font-bold text-gray-900">지역</label>
                        <select
                        onChange={handleDropArea} 
                        className='flex mx-2 h-full justify-center items-center px-2 border-[#BBBBBB]
                                    font-normal white-space-no-wrap text-gray-800 '
                        value={selectedAreaValue}>
                        { AREA_DATA.map(el => { 
                            return <option key={el.id}>{el.value}</option>; }) }
                        </select>
                    </div>
                    <div className='flex flex-row w-full'>
                        <label htmlFor="title" className="text-2xl font-bold text-gray-900">모집 유형</label>
                        <select
                        onChange={handleDropRecruitType}
                        className='flex mx-1 h-full justify-center items-center px-2 border-[#BBBBBB] 
                        font-normal white-space-no-wrap text-gray-800 '
                        value={selectedRecruitTypeValue}>{
                        RECRUIT_TYPE_DATA.map(el => {
                                return <option key={el.id}>{el.value}</option>;
                        })
                        }
                        </select>
                    </div>
                </div>
                <div className='flex flex-row'>
                    <label htmlFor="title" className="text-2xl font-bold text-gray-900 whitespace-nowrap mr-4">제목</label>
                    <input
                    onChange={handleChangeTitle}
                    type="text"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 w-full py-2.5"
                    placeholder="제목을 입력하세요"
                    required="required"
                    defaultValue={title}/>
                </div>
                <CKEditor editor={ClassicEditor}
                data={content}
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    // console.log('Editor is ready to use!', editor);
                    editor.ui.view.editable.element.style.minHeight = "30vh";
                }}
                onChange={(event, editor) => {
                    // const data = editor.getData();
                    // console.log({event, editor, data});
                    handleChangeContent(editor);
                }}
                onBlur={(event, editor) => {
                    // console.log('Blur.', editor);
                    editor.ui.view.editable.element.style.maxHeight = "500px";
                }}
                onFocus={(event, editor) => {
                    // console.log('Focus.', editor);
                    editor.ui.view.editable.element.style.minHeight = "30vh";
                    editor.ui.view.editable.element.style.maxHeight = "500px";
                }}/>
                <div className='flex w-full justify-center mx-auto pb-52'>
                <button type="button" className="m-1.5 w-20 bg-[#FF8C32]"
                onClick={handleSummbitButton}>제출</button>
                <button type="button" className="m-1.5 w-20 bg-white border border-[#AAAAAA]"
                onClick={handelCancleButton}>취소</button>
            </div>
            </div>
            
        </div>
    </div>
</>
    );
}
