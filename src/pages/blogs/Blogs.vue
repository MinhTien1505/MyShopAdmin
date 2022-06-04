<template>
  <div class="container-fluid pa-6">
    <v-row align="center">
      <h3 class="ma-2">Manage Blogs</h3>
      <v-spacer></v-spacer>
      <v-btn color="success" class="ma-2 white--text" @click="addPost()">
        New Post
        <v-icon right dark> mdi-plus </v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <v-card width="100%" class="ma-2" flat>
        <p>
          {{ content }}
        </p>
      </v-card>
    </v-row>

    <v-row>
      <Post v-for="item in list_post" :key="item.id" :post="item" @onStatusChange="updateStatusPost"></Post>
    </v-row>

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import PostAPI from "../../api/PostAPI";
import Post from "../../components/Post.vue";
export default {
  data: () => ({
    content: "",
    list_post: [],

    snackbar: false,
    text: "My timeout is set to 2000.",
    timeout: 2000,

    errorMessages: "",
  }),
  components: {
    Post,
  },
  async created() {
    await PostAPI.get()
      .then((res) => {
        this.list_post = res.data;
      })
      .catch((error) => {
        console.log(error.message);
        this.text = error.message;
        this.snackbar = true;
      });
  },
  methods: {
    async addPost() {
      this.$router.push({ name: "CreatePost" });
    },
    updateStatusPost(post_id, new_status) {
      this.list_post.forEach(element => {
        if (element._id == post_id) {
          element.status = new_status
        }
      });
    }
  },
};
</script>
