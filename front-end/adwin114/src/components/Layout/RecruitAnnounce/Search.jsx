import React, {useState} from 'react';

const AREA_DATA = [
    { id: null, value: '지역을 선택해주세요' },
    { id: '서울특별시', value: '서울특별시' },
    { id: '경기·인천', value: '경기·인천' },
    { id: '부산·울산·경남', value: '부산·울산·경남' },
    { id: '대구·경북', value: '대구·경북' },
    { id: '대전·충청', value: '대전·충청' },
    { id: '광주·전라', value: '광주·전라' },
    { id: '강원·제주', value: '강원·제주' }
    ];

const RECRUIT_TYPE_DATA = [
    { id: null, value: '정렬' },
    { id: '0001', value: '직원' },
    { id: '0002', value: '팀장' },
    { id: '0003', value: '본부장' },
    { id: '0004', value: '총괄' },
    { id: '0005', value: '대행사' },
    ];

const RECRUIT_ = [
    { id: null, value: '정렬' },
    { id: '0001', value: '직원' },
    { id: '0002', value: '팀장' },
    { id: '0003', value: '본부장' },
    { id: '0004', value: '총괄' },
    { id: '0005', value: '대행사' },
    ];

export default function SearchBar() {
    const [selectedAreaValue, setSelectedAreaValue] = useState(
        '지역'
    );
    const [selectedRecruitTypeValue, setSelectedRecruitTypeValue] = useState(
        '정렬'
    );

    const handleDropArea = (e) => {
        const {value} = e.target;
        setSelectedAreaValue(AREA_DATA.filter(el => el.value === value)[0].id);
        console.log(selectedAreaValue);
    };

    const handleDropRecruitType = (e) => {
        const {value} = e.target;
        setSelectedRecruitTypeValue(RECRUIT_TYPE_DATA.filter(el => el.value === value)[0].id);
        console.log(selectedRecruitTypeValue);
    };

    return (
        <div className="w-full inline-flex 1 items-stretch p-4 justify-center white-space-no-wrap">

            <div
                className='flex justify-center items-center border-2 border-solid border-[#BBBBBB] overflow-hidden '>
                <select
                    onChange={handleDropArea}
                    className='flex mx-2 h-full justify-center items-center px-2 border-[#BBBBBB]  
            font-normal white-space-no-wrap text-gray-800 '>
                    {
                        AREA_DATA.map(el => {
                            return <option key={el.id}>{el.value}</option>;
                        })
                    }
                </select>
            </div>

            <div className='white-space-no-wrap inline-flex grow'>
            <input
                type="text"
                className="flex px-2 py-1 border-y-2 border-solid border-[#BBBBBB] text-sm leading-snug
                 text-gray-700  shadow-none outline-none focus:outline-none w-full white-space-no-wrap
                 font-normal flex-1 placeholder-gray-400"
                placeholder="검색할 내용을 입력하세요"/>
                
            <button type='button' onClick={() => {}}
                className="flex justify-center items-center font-normal white-space-no-wrap border-y-2 border-r-2 border-solid
                border-[#BBBBBB] text-sm px-2 py-1 text-gray-800 mr-10">
                검색
            </button>
            </div>

            <div
                className='flex justify-center items-center border-2 border-solid border-[#BBBBBB] white-space-no-wrap '>
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
    )
}