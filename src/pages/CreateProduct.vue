<template>
  <div class="container-fluid">
    <h3 class="pb-4 pt-4">Create product</h3>
    <form>
      <v-row>
        <v-col cols="8">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" required />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Price</label>
            <div class="col-sm-10">
              <input class="form-control" />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Category</label>
            <div class="col-sm-10">
              <select class="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Description</label>
            <div class="col-sm-10">
              <textarea class="form-control" rows="5" id="comment"></textarea>
            </div>
          </div>
        </v-col>
        <v-col cols="4">
          <div
            class="imagePreviewWrapper"
            :style="{ 'background-image': `url(${previewImage})` }"
            @click="selectImage"
          ></div>
          <div class="text-center">
            <label class="upload-img" for="upload-photo">Upload file</label>
            <input
              type="file"
              name="photo"
              id="upload-photo"
              accept="image/*"
              ref="fileInput"
              @input="pickFile"
              @change="selectedFile"
            />
          </div>
        </v-col>
      </v-row>
      <div class="text-center p-3">
        <button class="btn btn-success mr-4" type="submit">Create</button>
        <button class="btn btn-warning">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    previewImage: null,
    product: {
      name: "",
      price: "",
      description: "",
      image: "",
      category: "",
      group: "",
    },
  }),
  methods: {
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
      this.product.image = e.target.files[0];
    },
  },
};
</script>

<style>
.imagePreviewWrapper {
  width: 85%;
  height: 300px;
  display: block;
  border: 1px solid rgb(97, 179, 218);
  margin: 0 auto 10px;
  background-size: contain;
  background-position: center;
  cursor: pointer;
}
.upload-img {
  cursor: pointer;
  background-color: rgb(61, 75, 75);
  padding: 5px 10px;
  color: white;
}

#upload-photo {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
</style>
