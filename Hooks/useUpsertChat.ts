import { useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "../mockApi/ChatApi";
import { Chat } from "../Models/Chat";

interface UpsertChatVariables {
  id: string;
  updatedChat: Partial<Chat>;
}

export const useUpsertChat = () => {
  const queryClient = useQueryClient();

  return useMutation<Chat | undefined, Error, UpsertChatVariables>({
    mutationFn: ({ id, updatedChat }) => chatApi.updateChat(id, updatedChat),
    onSuccess: () => {
      // Invalidate and refetch the availableChats query
      queryClient.invalidateQueries({ queryKey: ["availableChats"] });
    },
    onError: (error) => {
      // Handle any errors here
      console.error("Failed to update chat:", error);
    },
  });
};
