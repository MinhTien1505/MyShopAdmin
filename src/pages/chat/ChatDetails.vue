<template>
  <div class="container-fluid chat-details">
    <v-app-bar color="rgba(0,0,0,0)" flat>
      <v-badge bordered bottom color="green" dot offset-x="11" offset-y="13">
        <v-avatar class="mt-n7" size="40" elevation="10">
          <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
        </v-avatar>
      </v-badge>
      <v-toolbar-title class="title pl-0 ml-2 mt-n4">
        Fernando Gaucho
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="black" icon class="mt-n5">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>
    <div id="message-chat" class="pt-2">
      <template v-for="(chat, index) in chats">
        <v-app-bar v-if="chat.from === 'me'" flat class="mb-10" :key="index">
          <v-spacer></v-spacer>
          <v-card class="mt-10 mr-2" max-width="350px" color="blue" dark>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="mb-4">{{ chat.message }}</div>
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
              <img :src="chat.avt" />
            </v-avatar>
          </v-badge>
        </v-app-bar>
        <v-app-bar v-else flat class="mb-10" :key="index">
          <v-badge bordered bottom color="green" dot offset-x="16" offset-y="9">
            <v-avatar class="mt-n5 mr-2" size="30" elevation="10">
              <img :src="chat.avt" />
            </v-avatar>
          </v-badge>
          <v-card class="mt-10" max-width="350px">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="mb-4">
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
    </div>
    <v-app-bar flat>
      <v-text-field
        v-model="message"
        append-outer-icon="mdi-send"
        filled
        clear-icon="mdi-close-circle"
        clearable
        type="text"
        @click:append-outer="sendMessage"
        @click:clear="clearMessage"
      ></v-text-field>
    </v-app-bar>
  </div>
</template>
<script>
import * as io from "socket.io-client";

export default {
  data: () => ({
    socket: io.connect("http://localhost:5000"),
    message: "",
    chats: [
      {
        from: "me",
        message: "hello i love you so much",
        avt: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        date: "06-16-2019 12:43",
      },
      {
        from: "me",
        message: "hello i love you so much",
        avt: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        date: "06-16-2019 12:43",
      },
      {
        from: "client",
        message: "hello i love you so much",
        avt: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        date: "06-16-2019 12:43",
      },
      {
        from: "client",
        message: "hello i love you so much",
        avt: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        date: "06-16-2019 12:43",
      },
      {
        from: "me",
        message: "hello i love you so much",
        avt: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        date: "06-16-2019 12:43",
      },
      {
        from: "client",
        message: "hello i love you so much",
        avt: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        date: "06-16-2019 12:43",
      },
    ],
  }),
  mounted() {
    this.scrollToBottom();
    this.socket.on("USER_INFO", (user) => {
      console.log(user);
    });
  },
  methods: {
    sendMessage() {
      this.chats.push({
        from: "me",
        message: this.message,
        avt: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        date: "06-16-2019 12:43",
      });
      this.clearMessage();
      this.scrollToBottom()
    },
    clearMessage() {
      this.message = "";
    },
    scrollToBottom() {
      let container = document.getElementById("message-chat");
      container.scrollTop = container.scrollHeight;
      console.log(container.scrollHeight)
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
