import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ALL_COUNTRIES } from '../config';
import Controls from '../components/Controls';
import List from '../components/List';
import Card from '../components/Card';

const HomePage = ({ countries, setCountries }) => {
    const [filtredCountries, setFilteredCountries] = useState([]);

    const handleSearch = (search,region) =>{
        let data = [...countries];

        if (region){
            data = data.filter(item => item.region.includes(region));
        }

        if (search){
            data = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        setFilteredCountries(data);
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (!countries.length) {
            axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        handleSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[countries]);

    return (
        <>
            <Controls onSearch={handleSearch}/>
            <List>
                {filtredCountries.map((item) => {
                    const countryInfo = {
                        img: item.flags.png,
                        name: item.name,
                        info: [
                            {
                                title: 'Population',
                                description: item.population,
                            },
                            {
                                title: 'Region',
                                description: item.region,
                            },
                            {
                                title: 'Capital',
                                description: item.capital,
                            },
                        ],
                    };

                    return (
                        <Card
                            onClick={() => navigate(`/country/${item.name}`)}
                            key={item.name}
                            {...countryInfo}
                        />
                    );
                })}
            </List>
        </>
    );
};

export default HomePage;
