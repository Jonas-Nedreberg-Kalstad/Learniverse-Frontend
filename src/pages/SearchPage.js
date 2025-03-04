import '../App.css';
import Header from '../components/header/Header';
import Search from '../components/search/Search';
import Footer from '../components/footer/Footer';

function SearchPage() {
  return (
    <div className='App'>
      <Header />
      <Search />
      <Footer />
    </div>
  );
}

export default SearchPage;