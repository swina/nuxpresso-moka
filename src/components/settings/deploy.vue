<template>
    <div class="p-4">
        <h3>This options is disabled</h3>
    </div>
</template>

<script>
export default {
    name: 'MokaDeploy',
    computed:{
        enabled(){
            if ( !webpackHotUpdate ) this.$store.dispatch('message','This option is available only in development mode')
            return webpackHotUpdate ? true : false 
        }
    }

}
</script>