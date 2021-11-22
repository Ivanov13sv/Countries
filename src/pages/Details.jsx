import axios from 'axios';
import { useState, useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useParams, useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { searchByCountry } from '../config';
import Info from '../components/Info';

const Details = () => {
    let { name } = useParams();
    const navigate = useNavigate();
    const [country, setCounty] = useState(null);


    useEffect(() => {
        axios.get(searchByCountry(name)).then(({ data }) => setCounty(data[0]));
    }, [name]);

    return (
        <>
            <Button onClick={() => navigate(-1)}>
                {' '}
                <IoArrowBack /> Back{' '}
            </Button>
            {country && <Info navigate={navigate} {...country} />}
        </>
    );
};

export default Details;
