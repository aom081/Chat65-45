import { create } from "zustand";
import api from "../services/api.js";
import { useAuthStore } from "./useAuthStore.js";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,
  isFriend: false,
  friendRequestSent: false,
  friendRequestReceived: false,
  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await api.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Something went wrong while fetching user"
      );
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessage: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await api.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Something went wrong while getting message"
      );
    } finally {
      set({ isMessageLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    // console.log(selectedUser, messages);

    try {
      // console.log(messageData);

      const res = await api.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );

      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Something went wrong while sending message"
      );
    }
  },
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    // console.log("selectedUser", selectedUser);

    const socket = useAuthStore.getState().socket;
    // console.log(socket);

    socket.on("newMessage", (newMessage) => {
      // console.log("senderId", newMessage.senderId);
      // console.log("selectedUser", selectedUser._id);

      const isMessageSendFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSendFromSelectedUser) return;
      // console.log("Message", newMessage);

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  addFriend: async (friendId) => {
    try {
      const res = await api.post("/friend/add", { friendId });
      toast.success(res.data.message);
      console.log("friend", friendId);

      const socket = useAuthStore.getState().socket;
      if (socket) {
        socket.emit("friendRequestSent", friendId);
        console.log("sent friend request");
      }
      set({ friendRequestSent: true });
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Something went wrong while adding friend"
      );
    }
  },
  acceptFriendRequest: async (friendId) => {
    try {
      const res = await api.post("friend/accept", { friendId });
      toast.success(res.data.message);

      useAuthStore.getState().socket.emit("friendRequestAccepted", friendId);
      set({ isFriend: true, friendRequestReceived: false });
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Something went wrong while accepting a friend request"
      );
    }
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setIsFriend: (isFriend) => set({ isFriend }),
  setFriendRequestSent: (sent) => set({ friendRequestSent: sent }),
  setFriendRequestReceived: (received) =>
    set({ friendRequestReceived: received }),
}));
