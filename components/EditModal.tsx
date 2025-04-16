"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
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
  setSelectedMeme: Dispatch<SetStateAction<Meme | null>>;
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
          {selectedMeme && (
            <>
              <Input
                label="Name"
                value={selectedMeme.name}
                onChange={(e) =>
                  setSelectedMeme({ ...selectedMeme, name: e.target.value })
                }
              />
              <Input
                label="Image"
                value={selectedMeme.image}
                onChange={(e) =>
                  setSelectedMeme({ ...selectedMeme, image: e.target.value })
                }
              />
              <Input
                label="Likes"
                type="number"
                value={selectedMeme.likes.toString()}
                onChange={(e) =>
                  setSelectedMeme({
                    ...selectedMeme,
                    likes: parseInt(e.target.value) || 0,
                  })
                }
              />
            </>
          )}
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
