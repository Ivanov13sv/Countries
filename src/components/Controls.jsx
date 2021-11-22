import { useState, useEffect } from 'react';
import styled from 'styled-components'
import Seacrch from './Seacrch';
import { CustomSelect } from './CustomSelect';

const options = [
    { value: 'Africa', label: 'Africa' },
    { value: 'America', label: 'America' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Oceania', label: 'Oceania' },
];

const Controls = ({onSearch}) => {
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('');

    useEffect(() => {
        const regionValue = region?.value || '';

        onSearch(search,regionValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[search,region]);

    return (
        <Wrapper>
            <Seacrch search={search} setSearch={setSearch} />
            <CustomSelect
                options={options}
                placeholder="Filter by Region"
                isClearable
                isSearchable={false}
                value={region}
                onChange={setRegion}
            />
        </Wrapper>
    );
};

export default Controls;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (min-width: 767px){
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`