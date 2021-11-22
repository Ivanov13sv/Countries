import styled from 'styled-components';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { filterByCode } from '../config';

const Info = (props) => {
    const {
        name,
        nativeName,
        flag,
        capital,
        population,
        region,
        subregion,
        topLevelDomain,
        currencies = [],
        languages = [],
        borders = [],
        navigate,
    } = props;

    const [neighbors, setNeighbors] = useState([]);

    useEffect(() =>{
        if (borders.length)
        axios.get(filterByCode(borders)).then(
            ({data}) => setNeighbors(data.map(item => item.name))
        )
    },[borders])

    return (
        <Wrapper>
            <InfoImage src={flag} alt={name} />
            <div>
                <InfoTitle>{name}</InfoTitle>
                <ListGroup>
                    <List>
                        <ListItem>
                            <b>Native Name:</b> {nativeName}
                        </ListItem>
                        <ListItem>
                            <b>Population:</b> {population}
                        </ListItem>
                        <ListItem>
                            <b>Region:</b> {region}
                        </ListItem>
                        <ListItem>
                            <b>Sub Region:</b> {subregion}
                        </ListItem>
                        <ListItem>
                            <b>Capital:</b> {capital}
                        </ListItem>
                    </List>
                    <List>
                        <ListItem>
                            <b>Top Level Domain</b>{' '}
                            {topLevelDomain.map((item) => (
                                <span key={item}>{item}</span>
                            ))}
                        </ListItem>
                        <ListItem>
                            <b>Currencies</b>{' '}
                            {currencies.map((item) => (
                                <span key={item.code}>{item.name} </span>
                            ))}
                        </ListItem>
                        <ListItem>
                            <b>Language</b>{' '}
                            {languages.map((item) => (
                                <span key={item.name}>{item.name} </span>
                            ))}
                        </ListItem>
                    </List>
                </ListGroup>
                <Meta>
                    <b>Border Countries</b>
                    {!borders.length ? (
                        <span>There is no border countries</span>
                    ) : (
                        <TagGroup>
                            {neighbors.map((item) => (
                                <Tag key={item} onClick={() => navigate(`/country/${item}`)}>{item}</Tag>
                            ))}
                        </TagGroup>
                    )}
                </Meta>
            </div>
        </Wrapper>
    );
};

export default Info;

const Wrapper = styled.section`
    margin: 3rem 0 0 0;
    width: 100%;
    display: grid;
    grid-template-columns: 100%;
    gap: 2rem;

    @media (min-width: 767px) {
        grid-template-columns: minmax(100px, 400px) 1fr;
        align-items: center;
        gap: 5rem;
    }
    @media (min-width: 1024px) {
        grid-template-columns: minmax(400px, 600px) 1fr;
    }
`;

const InfoImage = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
`;
const InfoTitle = styled.h1`
    margin: 0;
    font-weight: var(--fw-normal);
`;
const ListGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    @media (min-width: 1024px) {
        flex-direction: row;
        gap: 4rem;
    }
`;
const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;
const ListItem = styled.li`
    line-height: 1.8rem;
    & > b {
        font-weight: var(--fw-bold);
    }
`;
const Meta = styled.div`
    margin: 3rem 0 0 0;
    display: flex;
    gap: 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    & > b {
        font-weight: var(--fw-bold);
    }

    @media (min-width: 767px) {
        flex-direction: row;
        align-items: center;
    }
`;
const TagGroup = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
`;
const Tag = styled.span`
    padding: 0 1rem;
    background-color: var(--colors-ui-base);
    box-shadow: var(--shadow);
    line-height: 1.5rem;
    cursor: pointer;
`;
