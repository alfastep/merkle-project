<template>
  <form method="post">
    <h1>Registration Form</h1>
    <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
    <label for="fname">First name:</label>
    <input class="u-60-width" type="text" id="fname" name="fname" v-model="user.firstName"><br><br>
    <label for="lname">Last name:</label>
    <input class="u-60-width" type="text" id="lname" name="lname" v-model="user.lastName"><br><br>
    <label for="address1">Address1:</label>
    <input class="u-60-width" type="text" id="address1" name="address1" v-model="user.address1"><br><br>
    <label for="address2">Address2:</label>
    <input class="u-60-width" type="text" id="address2" name="address2" v-model="user.address2"><br><br>
    <label for="city">City:</label>
    <input class="u-60-width" type="text" id="city" name="city" v-model="user.city"><br><br>
    <label for="state">State Abbreviation:</label>
    <input class="u-60-width" type="text" id="state" name="state" v-model="user.state"><br><br>
    <label for="zip">Zip:</label>
    <input class="u-60-width" type="number" id="zip" name="zip" v-model="user.zip"><br><br>
    <label for="country">Country</label>
    <select class="u-60-width" id="country" v-model="user.country">
      <option value="USA">USA</option>
    </select><br><br>
    <button @click='postData' class="button-primary" type="submit">Register</button>
  </form>
</template>

<script>
import axios from 'axios'
import {isValidStateAbbreviation} from 'usa-state-validator'

export default {
  name: 'Form',
  data() {
    return {
      user: {
        firstName: null,
        lastName: null,
        address1: null,
        address2: null,
        city: null,
        state: null,
        zip: null,
        country: null
      },
      errors: [],
    }
  },
  methods: {
    // Using axios to insert users into database
    postData(e){
      axios
      .post('/api/users', this.user)
      .then((result) => {
        console.log(result);
        // POST request successfull, then redirect to confirmation page.
        this.$router.push('confirmation');
      })
      .catch((err) => {
        console.log(err);
        const letters = /[^a-z]/i;

        /* 
        Peforming form validation below, and pushing to errors array to later display to user.
        */
    
        if (!this.user.firstName) {
          this.errors.push("First name required.");
        }
        if (!this.user.lastName) {
          this.errors.push("Last name required.");
        }
        if (!this.user.address1) {
          this.errors.push("Address1 required.");
        }
        if (!this.user.city) {
          this.errors.push("City required.");
        }
        if (!this.user.state) {
          this.errors.push("State required.");
        }
        if (!this.user.zip) {
          this.errors.push("Zip required.");
        }
        if (letters.test(this.user.firstName) || letters.test(this.user.lastName) || letters.test(this.user.city) || letters.test(this.user.state)) {
          this.errors.push("Only letters are allowed for first name, last name, city, and state.");
        }
        if (this.user.state && !isValidStateAbbreviation(this.user.state)) {
          this.errors.push("Please use a valid United States state abbreviation.")
        }
        if (this.user.zip && (this.user.zip.toString().length !== 5 || this.user.zip.toString().length !== 9 )) {
          this.errors.push("Your zipcode can only be 5 or 9 digits long")
        }
      });
      this.errors = [];
      e.preventDefault();
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
</style>
