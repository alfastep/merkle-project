<template>
  <div>
    <h1>Registered Users</h1>
    <table class="u-full-width">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Address1</th>
          <th>Address2</th>
          <th>City</th>
          <th>State</th>
          <th>Zip</th>
          <th>Country</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user">
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.address1 }}</td>
          <td>{{ user.address2 }}</td>
          <td>{{ user.city }}</td>
          <td>{{ user.state }}</td>
          <td>{{ user.zip }}</td>
          <td>{{ user.country }}</td>
          <td>{{ user.created_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'Admin',
  data() {
    return {
      users: []
    }
  },
  methods: {
    // Using axios to retrieve all users in the db
    getUsers(){
      axios
      .get('/api/admin')
      .then((result) => {
        console.log(result.data.data);
        this.users = result.data.data;
        this.users.forEach(user => {
          // Converting time to EST
          user.created_at = moment(user.created_at).subtract(14400, 'seconds').format('YYYY-MM-DD h:mm:ss A');
        });
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.getUsers();
  },
}
</script>