import React, {useState} from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const AREA_DATA = [
    { id: '', value: '지역' },
    { id: '서울특별시', value: '서울특별시' },
    { id: '경기·인천', value: '경기·인천' },
    { id: '부산·울산·경남', value: '부산·울산·경남' },
    { id: '대구·경북', value: '대구·경북' },
    { id: '대전·충청', value: '대전·충청' },
    { id: '광주·전라', value: '광주·전라' },
    { id: '강원·제주', value: '강원·제주' }
    ];

const RECRUIT_TYPE_DATA = [
    { id: '', value: '모집분야' },
    { id: 'SalesPerson', value: '직원' },
    { id: 'TeamLeader', value: '팀장' },
    { id: 'Director', value: '본부장' },
    { id: 'General', value: '총괄' },
    { id: 'Agency', value: '대행사' },
    ];

const REAL_ESTATE_TYPE_DATA = [
    { id: '', value: '물건' },
    { id: '아파트', value: '아파트' },
    { id: '빌라', value: '빌라' },
    { id: '지식산업센터', value: '지식산업센터' },
    { id: '상가', value: '상가' },
    { id: '오피스텔', value: '오피스텔' },
    { id: '토지', value: '토지' },
    { id: '기타', value: '기타' },
    ];

export default function SearchBar({fetctPosts, selectedAreaValue, setSelectedAreaValue,
    selectedRecruitTypeValue, setSelectedRecruitTypeValue,
    selectedRealEstateTypeValue, setSelectedRealEstateTypeValue, setSearch}) {
    const navigate = useNavigate();
    const handleDropArea = (e) => {
        setSelectedAreaValue(AREA_DATA.filter(el => el.value === e.target.value)[0].id);
        // navigate(`?area=${e.target.value}`);
        fetctPosts({area:AREA_DATA.filter(el => el.value === e.target.value)[0].id,
                    recruit_type:selectedRecruitTypeValue,
                    real_estate_type:selectedRealEstateTypeValue,
                    search:searchText});
    };

    const handleDropRecruitType = (e) => {
        setSelectedRecruitTypeValue(RECRUIT_TYPE_DATA.filter(el => el.value === e.target.value)[0].id);
        // navigate(`?recruit_type=${RECRUIT_TYPE_DATA.filter(el => el.value === e.target.value)[0].id}`);
        fetctPosts({area:selectedAreaValue,
            recruit_type:RECRUIT_TYPE_DATA.filter(el => el.value === e.target.value)[0].id,
            real_estate_type:selectedRealEstateTypeValue,
            search:searchText});
    };

    const handleDropBuildingType = (e) => {
        setSelectedRealEstateTypeValue(REAL_ESTATE_TYPE_DATA.filter(el => el.value === e.target.value)[0].id);
        // navigate(`?real_estate_type=${e.target.value}`);
        fetctPosts({area:selectedAreaValue,
        recruit_type:selectedRecruitTypeValue,
        real_estate_type:REAL_ESTATE_TYPE_DATA.filter(el => el.value === e.target.value)[0].id,
        search:searchText});
    };
    const [searchText, setSearchText] = useState('');
    const handleSearch = (e) => {
        setSearchText(e.target.value)
        setSearch(e.target.value);
    };
    
    const onKeyPress = (e) => {
        if (e.key == 'Enter') { 
            // navigate(`/recruit-announce?search=${e.target.value}`);
            fetctPosts({area:'',
        recruit_type:'',
        real_estate_type:'',
        search: searchText})
        }
    };
    return (
        <div className="w-full inline-flex items-stretch p-2 lg:p-4 justify-center whitespace-nowrap">
            <div
                className='flex border-2 border-[#BBBBBB]  '>
                <select
                    onChange={handleDropArea}
                    className='flex w-full h-full px-2 border-[#BBBBBB] whitespace-nowrap text-gray-800 '>
                    {
                        AREA_DATA.map(el => {
                            return <option key={el.id}>{el.value}</option>;
                        })
                    }
                </select>
                <select
                    onChange={handleDropBuildingType}
                    className='flex w-full h-full px-2 border-[#BBBBBB] whitespace-nowrap text-gray-800 border-r-2'>
                    {
                        REAL_ESTATE_TYPE_DATA.map(el => {
                            return <option key={el.id}>{el.value}</option>;
                        })
                    }
                </select>
                
            </div>

            <div className='whitespace-nowrap inline-flex grow'>
                <input
                    onChange={handleSearch}
                    onKeyPress={onKeyPress}
                    type="text"
                    className="flex px-2 py-1 border-y-2 border-solid border-[#BBBBBB] text-sm leading-snug
                    text-gray-700 shadow-none outline-none focus:outline-none w-full whitespace-nowrap
                    font-normal placeholder-gray-400"
                    placeholder="검색할 내용을 입력하세요"/>
                    
                <button type='button' onClick={() => {
                    fetctPosts({area:'',
                    recruit_type:'',
                    real_estate_type:'',
                    search: searchText})
                }}
                    className="flex justify-center items-center font-normal whitespace-nowrap border-y-2 border-r-2 border-solid
                    border-[#BBBBBB] text-sm px-2 py-1 text-gray-800 ">
                    검색
                </button>
            </div>

            <div
                className='flex justify-center items-center border-2 border-solid border-[#BBBBBB] whitespace-nowrap '>
                <select
                    onChange={handleDropRecruitType}
                    className='flex mx-1 h-full justify-center items-center px-2 border-[#BBBBBB] 
            font-normal whitespace-nowrap text-gray-800 '>{
                RECRUIT_TYPE_DATA.map(el => {
                            return <option key={el.id}>{el.value}</option>;
                        })
                    }
                </select>
            </div>
        </div>
    )
}