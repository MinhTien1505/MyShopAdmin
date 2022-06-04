<template>
  <div class="container-fluid pa-6">
    <v-row align="center">
      <h3 class="ma-2">Create new post</h3>
    </v-row>

    <v-row>
      <v-card width="100%" class="ma-2 py-4" flat>
        <v-text-field ref="title" v-model="post.title" counter="100"
          :rules="[() => !!post.title || 'This field is required']" :error-messages="errorMessages" label="Title"
          placeholder="Post's Title" outlined required></v-text-field>

        <v-text-field ref="title" v-model="post.subtitle" counter="200"
          :rules="[() => !!post.subtitle || 'This field is required']" :error-messages="errorMessages" label="Subtitle"
          placeholder="Post's Subtitle" outlined required>
        </v-text-field>

        <v-select v-model="post.topic" :items="topics" label="Topic" outlined></v-select>

        <v-row class="pt-6 pb-16">
          <v-col cols="3" align-self="center">
            <div class="text-center">
              <label class="upload-img" for="upload-photo" style="backgroud-color: #675e55">
                <i class="fas fa-upload"></i> Upload cover
              </label>
              <input type="file" name="photo" id="upload-photo" accept="image/*" ref="fileInput" @input="pickFile"
                @change="selectedFile" />
            </div>
          </v-col>
          <v-col cols="9">
            <div>
              <img class="image-placeholder" v-if="previewImage == ''" alt="preview" id="image-preview"
                src="../../../public/assets/assets/img/food-preview.png" />
              <img class="image-placeholder" v-else alt="preview" id="image-preview" @click="selectImage"
                :src="`${previewImage}`" />
            </div>
          </v-col>
        </v-row>
        <Tiptap v-model="post.content" />
      </v-card>
    </v-row>

    <v-row>
      <v-col>
        <div class="text-right p-3">
          <v-btn class="ma-2" outlined @click="cancel()"> Cancel </v-btn>

          <v-btn class="ma-2" depressed color="#FF8D9A" @click="submitPost()">
            Create
          </v-btn>
        </div>
      </v-col>
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
import Tiptap from "../../components/Tiptap.vue";
import getConfigHeaderAPI from "../../api/config";
import uploadFileToCloudinary from "../../composables/useUploadImage";
import useTopic from "../../composables/useTopic";
export default {
  data: () => ({
    topics: [],
    previewImage: "",
    post: {
      title: "",
      subtitle: "",
      topic: "",
      thumbnail: "",
      content: "",
      like: [],
      comment: [],
    },
    list_post: [],

    snackbar: false,
    text: "My timeout is set to 2000.",
    timeout: 2000,

    errorMessages: "",
  }),
  components: {
    Tiptap,
  },
  async created() {
    this.topics = useTopic();
    this.post.topic = this.topics[0];
  },
  methods: {
    async submitPost() {
      if (!this.hasEmptyField()) {
        await uploadFileToCloudinary(this.post.thumbnail, "blogs").then(
          (fileResponse) => {
            this.post.thumbnail = fileResponse.url;

            const config = getConfigHeaderAPI();

            // send API
            PostAPI.create(this.post, config)
              .then((res) => {
                this.text = res.data.message;
                this.snackbar = true;
              })
              .catch((error) => {
                console.log(error.message);
                this.text = error.message;
                this.snackbar = true;
              });
          }
        );
      }
    },
    hasEmptyField() {
      console.log("Title :", this.post.title);
      console.log("Content :", this.post.content);
      if (
        this.post.title == "" ||
        this.post.content == "" ||
        this.post.thumbnail == ""
      ) {
        this.text = "Please enter the information completely!";
        this.snackbar = true;
        return true;
      } else {
        return false;
      }
    },
    cancel() {
      this.$router.back();
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
    selectedFile(e) {
      this.post.thumbnail = e.target.files[0];
    },
  },
};
</script>
<style scoped>
.image-placeholder {
  width: 100%;
  height: 300px;
  display: block;
  border: 2px dashed #7a7a7a;
  border-radius: 4px;
  /* padding-top: 10px; */
  margin: 0px auto 10px;

  background-color: #21252910;
  cursor: pointer;
  object-fit: cover;
}

label.upload-img {
  cursor: pointer;
  background-color: #242424;
  padding: 8px 15px;
  color: #ffffff;
  border: 1px solid #212529;
  font-weight: 500;
  border-radius: 4px;
}

#upload-photo {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
</style>
