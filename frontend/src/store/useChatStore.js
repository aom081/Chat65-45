import { create } from "zustand";
import api from "../services/api.js";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  sendMessage: async (receiverId, text, image) => {
    const { authUser } = useAuthStore.getState();
    const response = await api.post(`/messages/${receiverId}`, { text, image });
    return response.data;
  },
  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await api.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Internal Server Error while getting users info"
      );
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await api.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Internal Server Error while getting messages"
      );
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  setMessages: async (messages) => {
    const { selectedUser, message } = get();
    try {
      const res = await api.post(`/messages/${selectedUser._id}`, {
        messageData,
      });
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(
        error.response.data.message || "Internal Server Error while sending"
      );
    }
  },
  SubscriptToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      const isMessageSenderSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSenderSelectedUser) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  setSelectedUser: (user) => {
    set({ selectedUser });
  },
}));
