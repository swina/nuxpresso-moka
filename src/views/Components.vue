<template>
    <div class="p-2">
        <h3>Components</h3>
        <moka-table ctx="components" :components="$store.getters.components" @component="setComponent" @message="message"/>
    </div>
</template>

<script>
import MokaTable from '@/components/table'
export default {
    components: { MokaTable },
    methods: {
        setComponent(component){
            this.$store.dispatch ( 'loadComponent' , component )
            this.$store.dispatch ( 'loadMedia' )
            this.$router.push ( '/moka' )
        },
        message(message){
            this.$emit('message',message)
        }
    }
}
</script>