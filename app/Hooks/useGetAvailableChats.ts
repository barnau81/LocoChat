import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { chatApi } from "../mockApi/newChatApi";
import { Chat } from "../Models/Chat";
import { isWithinRadius } from "../Utils/isWithinRadius";

export const useGetAvailableChats = () => {
  const [availableChats, setAvailableChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const {
    data: allChats,
    error: fetchError,
    isLoading: isFetching,
  } = useQuery<Chat[], Error>({
    queryKey: ["chats"],
    queryFn: chatApi.getAllChats,
  });

  useEffect(() => {
    const filterChats = async () => {
      if (!allChats) return;

      setIsLoading(true);
      try {
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

        setAvailableChats(
          filteredChats.filter((chat): chat is Chat => chat !== null)
        );
        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
        setIsLoading(false);
      }
    };

    if (allChats && !isFetching) {
      filterChats();
    }
  }, [allChats, isFetching]);

  useEffect(() => {
    if (fetchError) {
      setError(fetchError);
      setIsLoading(false);
    }
  }, [fetchError]);

  return { availableChats, isLoading, error };
};
