<template>
  <div class="geometric">
  </div>
</template>

<script>

export default {
  name: 'geometric',
  data () {
    return {
      msg: ''
    }
  },
  props: {
    searchList: Array,
    selectValue: Object
  },
  mounted () {
    // console.log(ss)
    this.data = this.searchList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
