import { Chat } from "../Models/Chat";

const STORAGE_KEY = "newChats";

// Load initial data from localStorage
const loadChats = (): Chat[] => {
  const storedChats = localStorage.getItem(STORAGE_KEY);
  return storedChats ? JSON.parse(storedChats) : [];
};

// Save chats to localStorage
const saveChats = (chats: Chat[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
};

let chats: Chat[] = loadChats();

// Create
const createChat = (chat: Chat): Chat => {
  chats.push(chat);
  saveChats(chats);
  return chat;
};

// Read
const getChat = (id: string): Chat | undefined => {
  return chats.find((chat) => chat.id === id);
};

const getAllChats = (): Chat[] => {
  return [...chats];
};

// Update
const updateChat = (
  id: string,
  updatedChat: Partial<Chat>
): Chat | undefined => {
  const index = chats.findIndex((chat) => chat.id === id);
  if (index !== -1) {
    chats[index] = { ...chats[index], ...updatedChat };
    saveChats(chats);
    return chats[index];
  }
  return undefined;
};

// Delete
const deleteChat = (id: string): boolean => {
  const initialLength = chats.length;
  chats = chats.filter((chat) => chat.id !== id);
  if (chats.length !== initialLength) {
    saveChats(chats);
    return true;
  }
  return false;
};

export const chatApi = {
  createChat,
  getChat,
  getAllChats,
  updateChat,
  deleteChat,
};
