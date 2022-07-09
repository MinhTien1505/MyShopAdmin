<template>
  <v-card max-width="100%" class="mx-auto" height="100%">
    <v-list two-line>
      <v-subheader> All message </v-subheader>
      <template v-for="(item, index) in items">
        <v-divider
          v-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item
          v-else
          :key="item.title"
          @click="chatDetails(item.chat_id)"
        >
          <v-badge overlap left offset-y="27" :value="item.un_read" dot offset-x="17" color="#E41E3F">
            <v-list-item-avatar>
              <v-img :src="item.avatar || 'https://toigingiuvedep.vn/wp-content/uploads/2021/05/avatar-trang-ngau.jpg'"></v-img>
            </v-list-item-avatar>
          </v-badge>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import ChatsAPI from "../../api/ChatsAPI";
import moment from "moment";
import * as io from "socket.io-client";
import { mapActions } from "vuex";

export default {
  data: () => ({
    // socket: io.connect("http://localhost:5000"),
    socket: io.connect("https://shopfreshapi.herokuapp.com"),
    items: [],
    loading: false
  }),
  created() {
    this.getAllChat();
    this.socket.on("pushMessage", async () => {
      this.items = [];
      await this.getAllChat();
    });
  },
  methods: {
    ...mapActions(["un_read", "read"]),
    async getAllChat() {
      this.loading = true;
      await ChatsAPI.getAllChats().then((res) => {
        this.loading = false;
        res.data.chats.sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        res.data.chats.forEach((chat) => {
          this.items.push({
            chat_id: chat.user._id,
            avatar: chat.user.avatar,
            title: chat.user.full_name,
            subtitle: `<span class="text--primary">${
              chat.messages[chat.messages.length - 1].author !== "shop"
                ? chat.messages[chat.messages.length - 1].data.text
                : ` <b>You: </b>${
                    chat.messages[chat.messages.length - 1].data.text
                  }`
            }</span> &mdash; ${moment(
              chat.messages[chat.messages.length - 1].data.meta
            ).format("MM-DD-YYYY kk:mm")}`,
            un_read: chat.messages[chat.messages.length - 1].author !== "shop"
          });
        });
        const hasUnReadMessage = this.items.some(item => item.un_read)
        hasUnReadMessage ? this.un_read() : this.read()
      });
    },
    chatDetails(chat_id) {
      this.$router.push({
        name: "chatDetails",
        params: { id: chat_id },
      });
    },
  },
};
</script>

<style></style>
