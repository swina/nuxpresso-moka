<template>
    <a :href="link" class="" @click="action">
        <component :is="component" :component="component" :el="el"/>
    </a>
</template>

<script>
//import MokaText from '@/components/editor/preview/elements/moka.text'
export default {
    name: 'MokaLink',
//    components: { MokaText },
    props: [ 'el' , 'child' ],
    data:()=>({
        elementAction: ''
    }),
    computed: {
        component(){
            return this.child
        },
        link(){
            if ( this.el.link.includes('#popup?') ){
                this.elementAction = { action:  'popup' , value: this.el.link.split('?')[1] }
                return '#' + this.el.link.split('?')[1]
            }
            return this.el.link
        }
    },
    methods:{
        action(){
            if ( this.elementAction ){
                this.$store.dispatch ( this.elementAction.action , this.elementAction.value )
            } else {
                return null
            }
        }
    }
}
</script>