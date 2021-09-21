<template>
    <div class="card mb-4">
        <div class="card-header">
            <i class="fas fa-table mr-1"></i>
            DataTable Example
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
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
import "datatables.net";
import "datatables.net-bs4";

import $ from 'jquery'; 
import axios from 'axios'; 

export default {
    data() {
        return {
            data: [],
        }
    },
    mounted() {
        var uri = "https://ghibliapi.herokuapp.com/films";
        axios.get(uri)
            .then((response) => {
                this.data = response.data;
                $(document).ready(function() {
                    $('#dataTable').DataTable();
                });
        })
    },
}
</script>

<style>
</style>