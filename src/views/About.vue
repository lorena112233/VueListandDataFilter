<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
<div id="app">
  {{ info }}
</div>
</template>
<script>
new Vue({
  el: '#app',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
      .get('https://search-api.swiftype.com/api/v1/public/engines/search.json')
      .then(response => (this.info = response))
  }
})
</script>

