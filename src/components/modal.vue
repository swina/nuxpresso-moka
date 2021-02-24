<template>
    <div :class="'modal bg-white z-2xtop shadow-lg rounded text-sm ' + size">
        <i v-if="close" class="material-icons absolute top-0 right-0 m-2 text-gray-400" @click="$emit('close')">close</i>
        <div class="w-full bg-gray-800 text-white rounded-tl rounded-tr px-2 py-1"><slot name="title"></slot></div>
        <div class="p-4">
            <slot name="content"></slot>
            <slot name="footer"></slot>
        </div>
        <div class="px-4 p-1">
            <slot name="confirm">{{ confirmMsg }}</slot>
        </div>
        <div v-if="buttons" :class="'w-full p-4 bg-gray-200 items-center justify-center p-2 grid grid-cols-' + btns[buttons].length">
            <template v-for="(button,i) in btns[buttons]">
                <button :class="button.class + ' m-auto'" @click="action(i)">
                    {{ button.label }}
                </button>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MokaModal',
    props: { 
        close : {
            type: Boolean,
            default: true
        },
        buttons: {
            type: String,
            default: 'standard'
        }
    },
    data:()=>({
        btns: {
            close: [
                { label: 'Close' , class: 'bg-gray-600 rounded-full w-20' }
            ],
            standard : [
                { label: 'Close' , class: 'danger rounded-full w-20' },
                {label:'OK',class:'success rounded-full w-20'}
            ],
            save : [
                 { label: 'Close' , class: 'bg-gray-600 rounded-full w-20' },
                { label: 'Save' , class: 'success rounded-full w-20' },
            ],
            delete : [
                { label: 'Close' , class: 'bg-gray-600 rounded-full w-20' },
                { label: 'Delete' , class: 'danger rounded-full w-20' },
            ]
        },
        confirmMsg: ''
    }),
    computed:{
        size(){
            return !this.$attrs.size ?
                        'w-1/3' :
                            this.$attrs.size === 'lg' ? 
                                'w-1/2' : 'w-1/3'
        },
        confirm(){
            return this.$attrs.confirm ? true : false
        }
    },
    methods:{
        action ( index ){
            if ( !this.confirm ){
                this.$emit('click_' + index )
            } else {
                console.log ( this.confirmMsg.length )
                if ( !this.confirmMsg.length ){
                    this.confirmMsg = this.$attrs.confirm 
                } else {
                    this.$emit ( 'click_' + index ) 
                }
                        
            }
        }
    },
    mounted(){
        
    }
}
</script>