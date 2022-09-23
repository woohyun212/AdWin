import React, {useState} from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5/build/ckeditor';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ORIGIN } from "components/APIRequest/APIRequest";
import { fetchToken,  fetchUserData } from 'Auth';

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

    
export default function RecruitAnnounceWrite() {
    let navigate = useNavigate();
    
    const [selectedAreaValue, setSelectedAreaValue] = useState(
        '지역'
    );
    const [selectedRecruitTypeValue, setSelectedRecruitTypeValue] = useState(
        '정렬'
    );

    const [postContents, setPostContents] = useState({
        title: '',
        content: '',
        area: selectedAreaValue,
        recruit_type: selectedRecruitTypeValue
      })
    
    const handleDropArea = (e) => {
        const {value} = e.target;
        setSelectedAreaValue(AREA_DATA.filter(el => el.value === value)[0].id);
        // console.log(selectedAreaValue)
    };

    const handleDropRecruitType = (e) => {
        const {value} = e.target;
        setSelectedRecruitTypeValue(RECRUIT_TYPE_DATA.filter(el => el.value === value)[0].id)
        // console.log(selectedRecritTypeValue)
    };

    const handleChangePostContent = (e) => {
        let _postContents = postContents;
        if (!("getData" in e)){
            _postContents.title = e.target.value;
            setPostContents(_postContents);
        }
        else {
            _postContents.content = e.getData();
            setPostContents(_postContents);
        }
        // console.log(postContents);
    };

    const handelCancleButton = (e) => {
        if (window.confirm("정말 취소합니까?")) {
            navigate('/recruit-announce');
          }
    };
    // const [response, setResponse] = useState("");
    const [error, setError] = useState(null);
    const handleSummbitButton = async (e) =>{
        if (window.confirm("제출 하시겠습니까?")) {
            let copy_postContents = postContents;
            copy_postContents.user_id = fetchUserData()._id;
            copy_postContents.area = selectedAreaValue;
            copy_postContents.recruit_type = selectedRecruitTypeValue;
            setPostContents(copy_postContents);
            if (postContents.area === null || postContents.recruit_type === null){
                alert("지역과 모집 유형을 선택해주세요.");
                return null;
            } else if (postContents.title === ""){
                alert("제목을 입력해주세요.");
                return null;
            } else if (postContents.content === ""){
                alert("내용 입력해주세요.");
                return null;
            }

            const fetctPosts = async () => {
                try {
                    setError(null);
                    const API_URI = `${API_ORIGIN}/posts?post_type=CounselorRecruit`
                    let response = await axios.post(API_URI, postContents,
                        {headers: {
                        Authorization: `Bearer ${fetchToken()}`
                    }}).then(function(result) {
                        console.log(result);
                        navigate(`/recruit-announce/${result.data._id}`); 
                      });
                } catch (e) {
                    setError(e);
                    alert(e.response.data.detail[0].msg);
                }
            };
            fetctPosts();
          }
    };


    if (!fetchToken()) {
        alert("로그인 후 이용하여 주시기 바랍니다.");
        if (window.confirm("로그인 하시겠습니까?")) {
            navigate('/login');
        }
    }

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
                                    font-normal white-space-no-wrap text-gray-800 '>
                        { AREA_DATA.map(el => { 
                            return <option key={el.id}>{el.value}</option>; }) }
                        </select>
                    </div>
                    <div className='flex flex-row w-full'>
                        <label htmlFor="title" className="text-2xl font-bold text-gray-900">모집 유형</label>
                        <select
                        onChange={handleDropRecruitType}
                        className='flex mx-1 h-full justify-center items-center px-2 border-[#BBBBBB] 
                        font-normal white-space-no-wrap text-gray-800 '>{
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
                    onChange={handleChangePostContent}
                    type="text"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 w-full py-2.5"
                    placeholder="제목을 입력하세요"
                    required="required"/>
                </div>
                <CKEditor editor={ClassicEditor}
                placeholder="??"
                data=""
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    // console.log('Editor is ready to use!', editor);
                    editor.ui.view.editable.element.style.minHeight = "30vh";
                }}
                onChange={(event, editor) => {
                    // const data = editor.getData();
                    // console.log({event, editor, data});
                    handleChangePostContent(editor);
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
