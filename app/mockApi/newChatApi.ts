import { NewChat } from "../Components/NewChatForm/NewChatForm";

const STORAGE_KEY = "newChats";

// Load initial data from localStorage
const loadChats = (): NewChat[] => {
  const storedChats = localStorage.getItem(STORAGE_KEY);
  return storedChats ? JSON.parse(storedChats) : [];
};

// Save chats to localStorage
const saveChats = (chats: NewChat[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
};

let chats: NewChat[] = loadChats();

// Create
const createChat = (chat: NewChat): NewChat => {
  chats.push(chat);
  saveChats(chats);
  return chat;
};

// Read
const getChat = (id: string): NewChat | undefined => {
  return chats.find((chat) => chat.id === id);
};

const getAllChats = (): NewChat[] => {
  return [...chats];
};

// Update
const updateChat = (
  id: string,
  updatedChat: Partial<NewChat>
): NewChat | undefined => {
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
