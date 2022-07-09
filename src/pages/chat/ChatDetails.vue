<template>
  <div class="container-fluid chat-details">
    <v-app-bar color="rgba(0,0,0,0)" flat>
      <v-badge bordered bottom color="green" dot offset-x="11" offset-y="13">
        <v-avatar class="mt-n7" size="40" elevation="10">
          <img :src="this.user.avatar || 'https://toigingiuvedep.vn/wp-content/uploads/2021/05/avatar-trang-ngau.jpg'" />
        </v-avatar>
      </v-badge>
      <v-toolbar-title class="title pl-0 ml-2 mt-n4">
        {{ this.user.full_name }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="black" icon class="mt-n5">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>
    <v-card id="message-chat" class="pt-2">
      <template v-for="(chat, index) in chats">
        <v-app-bar
          v-if="chat.from === 'shop'"
          flat
          class="mb-10"
          :key="index"
          color="white"
        >
          <v-spacer></v-spacer>
          <v-card class="mt-10 mr-2" max-width="450px" color="blue" dark>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="mb-2">{{ chat.message }}</div>
                <v-list-item-subtitle>{{ chat.date }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-badge
            bordered
            bottom
            color="green"
            dot
            offset-x="10"
            offset-y="10"
          >
            <v-avatar class="mt-n5" size="30" elevation="10">
              <img src="https://i.pinimg.com/originals/b4/6d/40/b46d40eb9f5f330fd966552f6c57839b.jpg" />
            </v-avatar>
          </v-badge>
        </v-app-bar>
        <v-app-bar v-else flat class="mb-10" :key="index" color="white">
          <v-badge bordered bottom color="green" dot offset-x="16" offset-y="9">
            <v-avatar class="mt-n5 mr-2" size="30" elevation="10">
              <img :src="chat.avt || 'https://toigingiuvedep.vn/wp-content/uploads/2021/05/avatar-trang-ngau.jpg'" />
            </v-avatar>
          </v-badge>
          <v-card class="mt-10" max-width="450px">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="mb-2">
                  {{ chat.message }}
                </div>
                <v-list-item-subtitle>{{ chat.date }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-btn color="black" icon class="mb-n10">
            <v-icon>fas fa-ellipsis-h</v-icon>
          </v-btn>
        </v-app-bar>
      </template>
    </v-card>
    <v-app-bar flat>
      <v-text-field
        v-model="message"
        append-outer-icon="mdi-send"
        clear-icon="mdi-close-circle"
        clearable
        type="text"
        @click:append-outer="sendMessage"
        @click:clear="clearMessage"
      ></v-text-field>
    </v-app-bar>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import * as io from "socket.io-client";
import ChatsAPI from "../../api/ChatsAPI";
import moment from "moment";
import UserAPI from "../../api/UserAPI";

export default {
  data: () => ({
    socket: io.connect("http://localhost:5000"),
    message: "",
    user: {},
    chats: [],
    loading: false
  }),
  mounted() {
    this.scrollToBottom();
  },
  updated() {
    this.scrollToBottom();
  },
  async created() {
    await this.getUserById();
    await this.getChatByUser();
    this.socket.on("pushMessage", (chat) => {
      this.chats = chat.messages.map((message) => {
        return {
          from: message.author,
          message: message.data.text,
          avt: this.user.avatar,
          date: moment(message.data.meta).format("MM-DD-YYYY kk:mm"),
        };
      });
      this.scrollToBottom();
    });
  },
  methods: {
    sendMessage() {
      this.chats.push({
        from: "shop",
        message: this.message,
        avt: "https://i.pinimg.com/originals/b4/6d/40/b46d40eb9f5f330fd966552f6c57839b.jpg",
        date: moment(Date.now()).format("MM-DD-YYYY kk:mm"),
      });
      this.socket.emit("sendMessageFromShop", {
        type: "text",
        author: this.$route.params.id,
        isShop: true,
        data: {
          text: this.message,
          meta: Date.now(),
        },
      });
      this.clearMessage();
      this.scrollToBottom();
    },
    clearMessage() {
      this.message = "";
    },
    scrollToBottom() {
      let container = document.getElementById("message-chat");
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    },
    async getUserById() {
      this.loading = true;
      await UserAPI.getUserById(this.$route.params.id).then((res) => {
        this.loading = false;
        this.user = res.data;
      });
    },
    async getChatByUser() {
      this.loading = true;
      await ChatsAPI.get(this.$route.params.id).then((res) => {
        this.loading = false;
        if (res.data.chat.length === 0) {
          this.chats = [];
        } else {
          this.chats = res.data.chat.messages.map((message) => {
            return {
              from: message.author,
              message: message.data.text,
              avt: this.user.avatar,
              date: moment(message.data.meta).format("MM-DD-YYYY kk:mm"),
            };
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.border {
  border-right: 1px solid grey;
}
.chat-details {
  padding: 0 !important;
  overflow-y: auto;
  margin-top: 8px;
}
#message-chat {
  height: calc(100vh - 200px) !important;
  overflow-y: auto;
}
</style>
