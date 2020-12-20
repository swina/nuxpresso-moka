<template>
    <div>
        Your session has been closed.
    </div>
</template>
<script>
export default {
    name: 'MokaLogout',
    mounted(){
        window.localStorage.removeItem('nuxpresso-jwt',null)
        window.localStorage.removeItem('nuxpresso-user',null)
        window.localStorage.removeItem('nuxpresso-production-jwt',null)
        this.$store.dispatch('user',null)
        this.$router.push('/')
    }
}
</script>