import { useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "../mockApi/ChatApi";

export const useDeleteChat = () => {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, string>({
    mutationFn: (id: string) => chatApi.deleteChat(id),
    onSuccess: () => {
      // Invalidate and refetch the availableChats query
      queryClient.invalidateQueries({ queryKey: ["availableChats"] });
    },
    onError: (error) => {
      // Handle any errors here
      console.error("Failed to delete chat:", error);
    },
  });
};
