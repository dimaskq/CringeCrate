"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@heroui/react";

interface Meme {
  id: number;
  name: string;
  image: string;
  likes: number;
}

interface MemeTableDisplayProps {
  memes: Meme[];
  onEdit: (meme: Meme) => void;
}

function MemeTableDisplay({ memes, onEdit }: MemeTableDisplayProps) {
  return (
    <Table aria-label="Meme table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Likes</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {memes.map((meme) => (
          <TableRow key={meme.id}>
            <TableCell>{meme.id}</TableCell>
            <TableCell>{meme.name}</TableCell>
            <TableCell>{meme.likes}</TableCell>
            <TableCell>
              <Button color="primary" onPress={() => onEdit(meme)}>
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default MemeTableDisplay;
