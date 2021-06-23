import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchImages } from './api';

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

function Main() {
  const [urls, setUrls] = useState(null);
  const [breed, setBreed] = useState('shiba');
  useEffect(() => {
    fetchImages({ breed: breed }).then((urls) => {
      setUrls(urls);
    });
  }, [breed]);

  return (
    <main>
      <section className="section">
        <div className="container">
          <Form setBreed={setBreed} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery urls={urls} />
        </div>
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="hero is-dark is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Cute Dog Images</h1>
        </div>
      </div>
    </header>
  );
}

type BreedFormProps = {
  setBreed: (value: string) => void;
};

const Form = (props: BreedFormProps) => {
  return (
    <div>
      <form>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select
                name="breed"
                defaultValue="shiba"
                onChange={(event) => props.setBreed(event.target.value)}
              >
                <option value="shiba">柴犬</option>
                <option value="akita">秋田犬</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

type ImageProps = {
  src: string;
};

const Image = ({ src }: ImageProps) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={src} alt="cute dog!" />
        </figure>
      </div>
    </div>
  );
};

type GalleryProps = {
  urls: string[] | undefined | null;
};

const Gallery = ({ urls }: GalleryProps) => {
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
          </div>
        );
      })}
    </div>
  );
};

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>Dog images are retrieved from Dog API</p>
        <p>
          <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
        </p>
      </div>
    </footer>
  );
}

const Loading: React.FC = () => {
  return <p>Loading...</p>;
};

export default App;
