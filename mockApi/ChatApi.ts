import { Chat } from "../Models/Chat";
import { queryClient } from "../queryClient";

const STORAGE_KEY = "newChats";

// Load initial data from localStorage
const loadChats = (): Chat[] => {
  const storedChats = localStorage.getItem(STORAGE_KEY);
  return storedChats ? JSON.parse(storedChats) : [];
};

// Save chats to localStorage
const saveChats = async (chats: Chat[]): Promise<void> => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
};

let chats: Chat[] = loadChats();

// Create
const createChat = async (chat: Chat): Promise<Chat> => {
  chats.push(chat);
  await saveChats(chats);
  queryClient.invalidateQueries({ queryKey: ["availableChats"] });
  return chat;
};

// Read
const getChat = async (id: string): Promise<Chat | undefined> => {
  return chats.find((chat) => chat.id === id);
};

const getAllChats = async (): Promise<Chat[]> => {
  return [...chats];
};

// Update
const upsertChat = async (
  id: string,
  updatedChat: Partial<Chat>
): Promise<Chat> => {
  const index = chats.findIndex((chat) => chat.id === id);
  let updatedChatObject: Chat;

  if (index !== -1) {
    updatedChatObject = { ...chats[index], ...updatedChat };
    chats[index] = updatedChatObject;
  } else {
    updatedChatObject = {
      id,
      ...updatedChat,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Chat;
    chats.push(updatedChatObject);
  }

  await saveChats(chats);
  return updatedChatObject;
};

// Delete
const deleteChat = async (id: string): Promise<boolean> => {
  const initialLength = chats.length;
  chats = chats.filter((chat) => chat.id !== id);
  if (chats.length !== initialLength) {
    await saveChats(chats);
    return true;
  }
  return false;
};

export const chatApi = {
  createChat,
  getChat,
  getAllChats,
  updateChat: upsertChat,
  deleteChat,
};
