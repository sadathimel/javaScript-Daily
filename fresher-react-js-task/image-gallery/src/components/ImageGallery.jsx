// src/components/ImageGallery.js
import React, { useState } from "react";
import "../App.css";
import DeleteButton from "./DeleteButton";
import Image from "./Image";

function ImageGallery() {
  const [images, setImages] = useState([
    {
      id: 1,
      url: "./images/image-1.webp",
      alt: "Image 1",
    },
    {
      id: 2,
      url: "./images/image-2.webp",
      alt: "Image 2",
    },
    {
      id: 3,
      url: "./images/image-3.webp",
      alt: "Image 3",
    },
    {
      id: 4,
      url: "./images/image-4.webp",
      alt: "Image 4",
    },
    {
      id: 5,
      url: "./images/image-5.webp",
      alt: "Image 5",
    },
    {
      id: 6,
      url: "./images/image-6.webp",
      alt: "Image 6",
    },
    {
      id: 7,
      url: "./images/image-7.webp",
      alt: "Image 7",
    },
    {
      id: 8,
      url: "./images/image-8.webp",
      alt: "Image 8",
    },
    {
      id: 9,
      url: "./images/image-9.webp",
      alt: "Image 9",
    },
    {
      id: 10,
      url: "./images/image-10.jpeg",
      alt: "Image 10",
    },
    {
      id: 11,
      url: "./images/image-11.jpeg",
      alt: "Image 11",
    },
  ]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

  const handleImageSelection = (imageId) => {
    // Update the selected state of the image

    // const updatedImages = images.map((image) =>
    //   image.id === imageId ? { ...image, selected: !image.selected } : image
    // );
    // setImages(updatedImages);
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.includes(imageId)
        ? prevSelectedImages.filter((id) => id !== imageId)
        : [...prevSelectedImages, imageId]
    );
    setDeletedImages(selectedImages);
    console.log(deletedImages);
  };

//  delete select image

  const handleImageDelete = (deletedImages) => {
    const updatedImages = images.filter((image) => !deletedImages.includes(image.id));
    setImages(updatedImages);
    setSelectedImages([]);
  };


  return (
    <div>
      <div className="image-list">
        {images.map((image) => (
          <Image
            key={image.id}
            src={image.url}
            alt={image.alt}
            selected={image.selected}
            // onDelete={() => handleImageDelete(image.id)}
            onSelect={() => handleImageSelection(image.id)}
          />
        ))}
        {/* <DeleteButton onDelete={() => handleImageDelete(deletedImages)} /> */}
      </div>
    </div>
  );
}

export default ImageGallery;
