import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { Album, Photo } from "./components";
import axios from "axios";

import { ThreeDots } from "react-loader-spinner";

function App() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/albums`
        );
        setAlbums(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };
    fetchAlbums();
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/albums/${selectedAlbumId}/photos`
        );
        setPhotos(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };
    if (selectedAlbumId) {
      fetchPhotos();
    } else {
      setPhotos([]);
    }
  }, [selectedAlbumId]);

  const handleAlbumClick = (albumId) => {
    setSelectedAlbumId(albumId);
  };

  return (
    <div className="container">
      <div className="flex gap-4">
        <div>
          <h1 className="pb-4 border-b-2 mb-4 sticky">Albums</h1>

          <div className="flex flex-col gap-2 h-screen overflow-y-auto pr-2">
            {isLoading ? (
              <>
                <p>Loading Albums...</p>
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#4fa94d"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <React.Fragment>
                {albums.map((album) => (
                  <Album
                    key={album.id}
                    onClick={() => handleAlbumClick(album.id)}
                    title={album.title}
                  />
                ))}
                {isLoading && (
                  <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#4fa94d"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                )}
              </React.Fragment>
            )}
          </div>
        </div>
        <div className="flex-1">
          <h1 className="pb-4 border-b-2 mb-4">Photos</h1>

          <div className="grid grid-cols-4 gap-4">
            {isLoading ? (
              <p>Loading Photos...</p>
            ) : error ? (
              <p>{error}</p>
            ) : selectedAlbumId ? (
              photos.map((photo) => (
                <Photo key={photo.id} title={photo.title} url={photo.url} />
              ))
            ) : (
              <p className="col-span-4 text-gray-500">
                Click on an album to start viewing photos.
              </p>
            )}
            {!isLoading && !photos.length && (
              <p className="col-span-4">No photos found in this album</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
