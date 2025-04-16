"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@heroui/react";
import Cookies from "js-cookie";

interface Meme {
  id: number;
  name: string;
  image: string;
  likes: number;
}

function MemeList() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLinkClicked, setIsLinkClicked] = useState(false); // State to prevent double clicks
  useEffect(() => {
    const savedMemes = Cookies.get("memes");
    if (savedMemes) {
      setMemes(JSON.parse(savedMemes));
    }
  }, []);

  const openImageModal = (image: string) => {
    setSelectedImage(image);
    onOpen();
  };

  const isExternalUrl = (path: string) =>
    /^https?:\/\//.test(path) && !path.startsWith("data:image/");

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string
  ) => {
    if (isLinkClicked) return;
    setIsLinkClicked(true);
    e.preventDefault();
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => setIsLinkClicked(false), 1000);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {memes.map((meme) => (
        <Card key={meme.id} className="max-w-sm">
          <CardHeader>
            <p className="text-lg font-bold">{meme.name}</p>
          </CardHeader>
          <CardBody className="flex justify-center items-center">
            <Image
              src={meme.image}
              alt={meme.name}
              className="w-full h-48 object-contain cursor-pointer"
              onClick={() => openImageModal(meme.image)}
            />
          </CardBody>
          <CardFooter className="flex justify-between">
            <p>Лайки: {meme.likes}</p>
            {isExternalUrl(meme.image) ? (
              <a
                href={meme.image}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
                onClick={(e) => handleLinkClick(e, meme.image)}
              >
                Review
              </a>
            ) : (
              <p className="text-primary">
                {meme.image.startsWith("data:image/")
                  ? "Uploaded image"
                  : "Local image"}
              </p>
            )}
          </CardFooter>
        </Card>
      ))}

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalContent className="h-screen overflow-hidden">
          <ModalBody className="flex items-center justify-center p-0 h-full overflow-hidden">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Full screen meme"
                className="max-w-full max-h-full object-contain"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default MemeList;
