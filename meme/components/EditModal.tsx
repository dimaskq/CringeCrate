"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  useDisclosure,
} from "@heroui/react";

interface Meme {
  id: number;
  name: string;
  image: string;
  likes: number;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMeme: Meme | null;
  onSave: () => void;
  setSelectedMeme: React.Dispatch<React.SetStateAction<Meme | null>>;
}

function EditModal({
  isOpen,
  onClose,
  selectedMeme,
  onSave,
  setSelectedMeme,
}: EditModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Edit Meme</ModalHeader>
        <ModalBody>
          <Input
            label="ID"
            value={selectedMeme?.id?.toString() || ""}
            isDisabled
          />
          <Input
            label="Name"
            value={selectedMeme?.name || ""}
            onChange={(e) => {
              if (selectedMeme) {
                setSelectedMeme({ ...selectedMeme, name: e.target.value });
              }
            }}
          />
          <Input
            label="Image path or URL"
            value={selectedMeme?.image || ""}
            onChange={(e) => {
              if (selectedMeme) {
                setSelectedMeme({ ...selectedMeme, image: e.target.value });
              }
            }}
          />
          <Input
            label="Likes"
            type="number"
            value={selectedMeme?.likes?.toString() || ""}
            onChange={(e) => {
              if (selectedMeme) {
                setSelectedMeme({
                  ...selectedMeme,
                  likes: parseInt(e.target.value) || 0,
                });
              }
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={onSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditModal;
