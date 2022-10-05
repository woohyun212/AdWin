import React from 'react';
import React, {useState} from 'react';

// const AREA_DATA = [
//     { id: null, value: '지역' },
//     { id: '0001', value: '서울' },
//     { id: '0002', value: '경기' },
//     { id: '0003', value: '인천' },
//     { id: '0004', value: '강원' },
//     { id: '0005', value: '충청' },
//     { id: '0006', value: '전라' },
//     { id: '0007', value: '경상' },
//     { id: '0008', value: '제주' },
//     ];


export default function SearchBar() {
    const [searchText, setSearchText] = useState('');
    const handleSearch = (e) => {
        setSearchText(e.target.value)
        setSearch(e.target.value);
    };
    
    const onKeyPress = (e) => {
        if (e.key == 'Enter') { 
            
            fetctPosts({area:'',
                recruit_type:'',
                real_estate_type:'',
                search: searchText})
                }
            };

    return (
        <div className="w-full flex flex-wrap items-stretch p-4 justify-between">

            {/* <div
                className='flex justify-center items-center border-2 border-solid border-[#BBBBBB] whitespace-nowrap '>
                <select
                    onChange={handleDropArea}
                    className='flex mx-2 h-full justify-center items-center px-2 border-[#BBBBBB]  
            font-normal whitespace-nowrap text-gray-800 '>
                    {
                        AREA_DATA.map(el => {
                            return <option key={el.id}>{el.value}</option>;
                        })
                    }
                </select>
            </div> */}

            <input
                type="text"
                className="flex px-2 py-1 border-y-2 border-l-2 border-solid border-[#BBBBBB] text-sm leading-snug
                 text-gray-700  shadow-none outline-none focus:outline-none w-full
                 font-normal flex-1 placeholder-gray-400"
                placeholder="검색할 내용을 입력하세요"/>
                
            <span
                className="flex justify-center items-center font-normal whitespace-nowrap border-y-2 border-x-2 border-solid
                border-[#BBBBBB] text-sm px-2 py-1 text-gray-800 mr-10">
                검색
            </span>

            {/* <div
                className='flex justify-center items-center border-2 border-solid border-[#BBBBBB] whitespace-nowrap '>
                <select
                    onChange={handleDropRecruitType}
                    className='flex mx-1 h-full justify-center items-center px-2 border-[#BBBBBB] 
            font-normal whitespace-nowrap text-gray-800 '>
                {RECRUIT_TYPE_DATA.map(el => {
                            return <option key={el.id}>{el.value}</option>;
                        })
                    }
                </select>
            </div> */}
        </div>
    )
}