<template>
  <div>
    <h2>You have successfully registered!</h2>
  </div>
</template>
<script>
export default {
  name: 'Confirmation',
  created(){
    setTimeout( () => this.$router.push({ path: '/'}), 5000);
  }
}
</script>