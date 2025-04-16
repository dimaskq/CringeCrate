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
  Link,
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

  const isExternalUrl = (path: string) => /^https?:\/\//.test(path);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {memes.map((meme) => (
        <Card key={meme.id} className="max-w-sm">
          <CardHeader>
            <p className="text-lg font-bold">{meme.name}</p>
          </CardHeader>
          <CardBody>
            <Image
              src={meme.image}
              alt={meme.name}
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => openImageModal(meme.image)}
            />
          </CardBody>
          <CardFooter className="flex justify-between">
            <p>Лайки: {meme.likes}</p>
            {isExternalUrl(meme.image) ? (
              <Link href={meme.image} isExternal>
                Review
              </Link>
            ) : (
              <p className="text-primary">Local image</p>
            )}
          </CardFooter>
        </Card>
      ))}

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalContent>
          <ModalBody className="flex items-center justify-center p-0">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Full screen meme"
                className="max-w-full max-h-screen object-contain"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default MemeList;
