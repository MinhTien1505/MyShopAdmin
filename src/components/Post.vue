<template>
  <v-col cols="4">
    <v-card outlined class="d-flex flex-column" max-width="100%" height="100%">
      <v-img class="flex-grow-0 flex-shrink-0" height="240" :src="post.thumbnail"></v-img>

      <v-card-text>
        <h2 class="text-h6 primary--text">
          {{ post.title }}
        </h2>
        <p>{{ "Publish at: " + createdDate }}</p>
      </v-card-text>

      <v-card-actions class="mt-auto">
        <v-btn color="pink accent-3" outlined @click="editPost(post._id)">
          Edit
        </v-btn>

        <v-btn color="blue-grey" outlined @click="deletePost(post._id)">
          Delete
        </v-btn>

        <v-spacer></v-spacer>
        <v-row align="center" justify="end" class="mx-2">
          <v-icon class="mr-1"> mdi-heart </v-icon>
          <span class="subheading mr-2">{{ post.likes.length }}</span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1"> mdi-comment </v-icon>
          <span class="subheading">{{ post.comments.length }}</span>
        </v-row>
      </v-card-actions>
      <v-overlay absolute :value="post.status == 'Hidden'">
        <v-btn @click="activePost(post._id)" color="blue" depressed>
          <v-icon left>
            mdi-lock-open
          </v-icon>
          Active
        </v-btn>
      </v-overlay>
    </v-card>
  </v-col>
</template>

<script>
import PostAPI from "../api/PostAPI";
import getConfigHeaderAPI from "../api/config";

export default {
  props: ["post"],
  data() {
    return {
      dateFormatOption: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
    };
  },
  computed: {
    createdDate() {
      const date = new Date(this.post.createdAt);
      return date.toLocaleDateString("en-US");
    },
  },
  methods: {
    editPost(post_id) {
      this.$router.push({
        name: "EditPost",
        params: { post_id: post_id },
      });
    },
    async deletePost(post_id) {
      const config = getConfigHeaderAPI();
      await PostAPI.delete(post_id, config).then((res) => {
        this.$emit('onStatusChange', post_id, 'Hidden');
        console.log(res.data);
      });
    },
    async activePost(post_id) {
      const config = getConfigHeaderAPI();
      await PostAPI.update(post_id, { status: 'Active' }, config).then((res) => {
        this.$emit('onStatusChange', post_id, 'Active');
        console.log(res.data);
      });
    },
  },
};
</script>
<style>
</style>