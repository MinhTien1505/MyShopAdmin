<template>
  <div class="card mb-4">
    <div class="card-header">
      <i class="fas fa-table mr-1"></i>
      DataTable Example
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table
          class="table table-bordered"
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Original Title</th>
              <th>Director</th>
              <th>Release</th>
              <th>Time</th>
              <th>Score</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>Title</th>
              <th>Original Title</th>
              <th>Director</th>
              <th>Release</th>
              <th>Time</th>
              <th>Score</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="film in data" :key="film.id">
              <td>{{ film.title }}</td>
              <td>{{ film.original_title }}</td>
              <td>{{ film.director }}</td>
              <td>{{ film.release_date }}</td>
              <td>{{ film.running_time }}</td>
              <td>{{ film.rt_score }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    data: [],
  }),
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.data = [
        {
          title: "123",
          director: "123",
          original_title: "123",
          release_date: "123",
          running_time: "123",
          rt_score: "123",
        },
        {
          title: "123",
          director: "123",
          original_title: "123",
          release_date: "123",
          running_time: "123",
          rt_score: "123",
        },
        {
          title: "123",
          director: "123",
          original_title: "123",
          release_date: "123",
          running_time: "123",
          rt_score: "123",
        },
        {
          title: "123",
          director: "123",
          original_title: "123",
          release_date: "123",
          running_time: "123",
          rt_score: "123",
        },
        {
          title: "123",
          director: "123",
          original_title: "123",
          release_date: "123",
          running_time: "123",
          rt_score: "123",
        },
        {
          title: "123",
          director: "123",
          original_title: "123",
          release_date: "123",
          running_time: "123",
          rt_score: "123",
        },
        {
          title: "123",
          director: "123",
          original_title: "123",
          release_date: "123",
          running_time: "123",
          rt_score: "123",
        },
        {
          title: "123",
          director: "123",
          original_title: "123",
          release_date: "123",
          running_time: "123",
          rt_score: "123",
        },
        {
          title: "123",
          director: "123",
          original_title: "123",
          release_date: "123",
          running_time: "123",
          rt_score: "123",
        },
        {
          title: "123",
          director: "123",
          original_title: "123",
          release_date: "123",
          running_time: "123",
          rt_score: "123",
        },
        {
          title: "123",
          director: "123",
          original_title: "123",
          release_date: "123",
          running_time: "123",
          rt_score: "123",
        },
        {
          title: "123",
          director: "123",
          original_title: "123",
          release_date: "123",
          running_time: "123",
          rt_score: "123",
        },
        {
          title: "123",
          director: "123",
          original_title: "123",
          release_date: "123",
          running_time: "123",
          rt_score: "123",
        },
        {
          title: "123",
          director: "123",
          original_title: "123",
          release_date: "123",
          running_time: "123",
          rt_score: "123",
        },
        {
          title: "123",
          director: "123",
          original_title: "123",
          release_date: "123",
          running_time: "123",
          rt_score: "123",
        },
      ];
    },
  },
};
</script>

<style></style>
