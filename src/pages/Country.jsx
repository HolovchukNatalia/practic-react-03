import { useEffect, useRef, useState } from 'react';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Section from '../components/Section/Section';
import { fetchCountry } from '../service/countryApi';
import { useLocation, useParams } from 'react-router-dom';
import CountryInfo from '../components/CountryInfo/CountryInfo';
import Loader from '../components/Loader/Loader';
import GoBackBtn from '../components/GoBackBtn/GoBackBtn';

const Country = () => {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { contryId } = useParams();
  const location = useLocation();
  const goBack = useRef(location?.state ?? '/');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCountry(contryId);
        setCountry(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [contryId]);

  return (
    <Section>
      <Container>
        <GoBackBtn path={goBack.current} />
        {isLoading && <Loader />}
        {error && <Heading title="ooops! somesing went wrong..." bottom />}
        {country && <CountryInfo {...country} />}
        <Heading title="SearchCountry" bottom />
      </Container>
    </Section>
  );
};

export default Country;
