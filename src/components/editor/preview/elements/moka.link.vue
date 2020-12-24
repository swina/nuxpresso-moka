<template>
    <a :href="el.link" class="">
        <component :is="component" :component="component" :el="el"/>
    </a>
</template>

<script>
//import MokaText from '@/components/editor/preview/elements/moka.text'
export default {
    name: 'MokaLink',
//    components: { MokaText },
    props: [ 'el' , 'child' ],
    computed: {
        component(){
            return this.child
        }
    }
}
</script>