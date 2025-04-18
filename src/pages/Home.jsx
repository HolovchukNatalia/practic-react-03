import { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Section from '../components/Section/Section';
import Loader from '../components/Loader/Loader';
import CoutryList from '../components/CountryList/CountryList';
import { getCountries } from '../service/countryApi';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Section>
      <Container>
        {isLoading && <Loader />}
        {error && <Heading title="ooops! somesing went wrong..." bottom />}
        {countries.length > 0 && <CoutryList countries={countries} />}
        <Heading title="Home" bottom />
      </Container>
    </Section>
  );
};
export default Home;
