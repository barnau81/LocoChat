import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../mockApi/ChatApi";
import { Chat } from "../Models/Chat";
import { isWithinRadius } from "../Utils/isWithinRadius";

export const useGetAvailableChats = () => {
  return useQuery<Chat[], Error>({
    queryKey: ["availableChats"],
    queryFn: async () => {
      const allChats = await chatApi.getAllChats();
      const filteredChats = await Promise.all(
        allChats.map(async (chat) => {
          const isWithin = await isWithinRadius(
            chat.radiusInMiles,
            chat.latitude,
            chat.longitude
          );
          return isWithin ? chat : null;
        })
      );
      return filteredChats.filter((chat): chat is Chat => chat !== null);
    },
    refetchInterval: 5000, // Refetch every 5 seconds (adjust as needed)
  });
};
