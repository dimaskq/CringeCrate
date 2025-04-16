"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import MemeTableDisplay from "./MemeTableDisplay";
import EditModal from "./EditModal";
import { useDisclosure } from "@heroui/react";

interface Meme {
  id: number;
  name: string;
  image: string;
  likes: number;
}

const initialMemes: Meme[] = [
  {
    id: 1,
    name: "Husband check",
    image: "/areYouMan.png",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 2,
    name: "Borshch lover",
    image: "/borshch.jpg",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 3,
    name: "Arestovich knows everything",
    image: "/eurovision.jpg",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 4,
    name: "Football everyday life of Ukrainians",
    image: "/football.jpg",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 5,
    name: "I don't know anything and I'm not hiding it.",
    image: "/googler.png",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 6,
    name: "We are all this kitty",
    image: "/kicun.jpg",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 7,
    name: "Feedback from Ukrainian writers",
    image: "/literature.jpg",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 8,
    name: "Salo - strength",
    image: "/salo.jpg",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 9,
    name: "Ukrposhta onelav",
    image: "/ukrposhta.png",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 10,
    name: "Calm down",
    image: "/uspokiysya.jfif",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 11,
    name: "Cool",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvzTAz0n_p5GyzLkmRP0JZ-r_Cd0dEfUmbjw&s",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 12,
    name: "Reality",
    image:
      "https://thunderdungeon.com/wp-content/uploads/2025/01/funny-memes-4-1-1-2025.jpg",
    likes: Math.floor(Math.random() * 100),
  },
];

function MemeTable() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setMemes(initialMemes);
    Cookies.set("memes", JSON.stringify(initialMemes), { expires: 7 });
  }, []);

  const saveMemes = (updatedMemes: Meme[]) => {
    setMemes(updatedMemes);
    Cookies.set("memes", JSON.stringify(updatedMemes), { expires: 7 });
  };

  const openEditModal = (meme: Meme) => {
    setSelectedMeme({ ...meme });
    onOpen();
  };

  const handleSave = () => {
    if (!selectedMeme) return;
    if (
      !selectedMeme.name ||
      selectedMeme.name.length < 3 ||
      selectedMeme.name.length > 100
    ) {
      alert("The name must be between 3 and 100 characters.");
      return;
    }
    const isLocalPath = selectedMeme.image.startsWith("/");
    const isValidUrl = /^https?:\/\/.+\..+$/i.test(selectedMeme.image);
    if (!isLocalPath && !isValidUrl) {
      alert('The image path must be local (starts with "/") or a valid URL');
      return;
    }
    if (
      selectedMeme.likes < 0 ||
      selectedMeme.likes > 99 ||
      isNaN(selectedMeme.likes)
    ) {
      alert("Likes must be a number from 0 to 99");
      return;
    }
    const updatedMemes = memes.map((m) =>
      m.id === selectedMeme.id ? selectedMeme : m
    );
    saveMemes(updatedMemes);
    onClose();
  };

  return (
    <div>
      <MemeTableDisplay memes={memes} onEdit={openEditModal} />
      <EditModal
        isOpen={isOpen}
        onClose={onClose}
        selectedMeme={selectedMeme}
        onSave={handleSave}
        setSelectedMeme={setSelectedMeme}
      />
    </div>
  );
}

export default MemeTable;
