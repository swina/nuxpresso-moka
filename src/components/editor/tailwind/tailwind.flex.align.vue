<template>
    <div class="flex flex-col">
        Columns / Rows
        <select v-model="flex" @change="$emit('css',flex + ' '),update()">
            <option value="flex-col">Column</option>
            <option value="flex-row">Row</option>
        </select>
        Justify Items 
        <select class="dark" v-model="align" @change="update()">
            <option value="">not set</option>
            <option :key="ai.value" v-for="ai in alignItems" :value="ai.value">{{ ai.label }}</option>
        </select>
        
        Align Items 
        <select class="dark" v-model="justify" @change="update()">
            <option value="">not set</option>
            <option :key="ji.value" v-for="ji in justifyItems" :value="ji.value">{{ ji.label }}</option>
        </select>
        

        Order Item
        <select class="dark" v-model="order" @change="update()">
            <option value="">not set</option>
            <option :key="ord.value" v-for="ord in orderItems" :value="ord.value">{{ ord.label }}</option>
        </select>
        <div><input type="checkbox" v-model="responsive.order"/> apply only responsive</div>
        <!--
        Place Items 
        <select class="dark" v-model="items.place" @change="update()">
            <option value="">not set</option>
            <option :key="pi.value" v-for="pi in placeItems" :value="pi.value">{{ pi.label }}</option>
        </select>
        -->
    </div>
</template>

<script>
export default {
    data:()=>({
        
            flex: '',
            align: '',
            justify: '',
            place: '',
            order:'',
        
        responsive: {
            align: false,
            justify: false,
            order: false
        },
        alignItems: [
            { label: 'start', value: 'items-start'},
            { label: 'center', value: 'items-center'},
            { label: 'end', value: 'items-end'},
            { label: 'baseline', value: 'items-baseline'},
            { label: 'stretch', value: 'items-stretch'}
        ],
        justifyItems: [
            { label: 'start', value: 'justify-start' },
            { label: 'center', value: 'justify-center'},
            { label: 'end', value: 'justify-end'},
            { label: 'between', value: 'justify-between'},
            { label: 'around', value: 'justify-around'},
            { label: 'evenly', value: 'justify-evenly'},
        ],
        orderItems: [
            { label: 'none' , value: 'order-none' },
            { label: 'first' , value: 'order-first' },
            { label: 'last' , value: 'order-last' },
        ],
        placeItems: [
            { label: 'auto', value: 'place-items-auto' },
            { label: 'start', value: 'place-items-start'},
            { label: 'center',value: 'place-items-center'},
            { label: 'end',value:'place-items-end'},
            { label: 'stretch',value:'place-items-stretch'}
        ]
    }),
    props: [ 'css' ],
    watch:{
        flex(v){
            this.$emit('css',v + ' ')
            this.update ( v )
        },
        align(v){
            this.$emit('css',v + ' ')
            this.update(v)

        },
        justify(v){
            this.$emit('css',v + ' ')
            this.update ( v )
        },
        order(v){
            let css = v
            if ( this.responsive.order ){
                css = v + ' md:order-none'
            }
            this.$emit('css',css + ' ')
            this.update(v)
        },
      
    },
    mounted(){
        if ( !this.css.length ) return
        let classes = this.css.split(' ')
        classes.forEach ( cl => {
            if ( cl.indexOf ( 'flex-row') ){
                this.flex = cl
            }
            if ( cl.indexOf ( 'flex-col') ){
                this.flex = cl
            }
            this.alignItems.forEach ( ai => {
                if ( cl.indexOf(ai.value) > -1 ){
                    this.align = ai.value
                }
            })
            this.justifyItems.forEach ( ji => {
                if ( cl.indexOf(ji.value) > -1 ){
                    this.justify = ji.value
                }
            })
            this.orderItems.forEach ( oi => {
                if ( oi.value.indexOf(cl) > -1 ){
                    
                    this.order = oi.value.replace('md:','')
                    if ( cl.indexOf('md:') ){
                        this.responsive.order = true
                    }
                }
            })
            this.placeItems.forEach ( pi => {
                if ( cl.indexOf(pi.value) > -1 ){
                    this.place = pi.value
                }
            })
        })
        //this.update()
    },
    methods: {
        update(v){
            let responsive = this.order ? 'md:order-none' : ''
            let css = this.flex + ' ' + this.justify + ' ' + this.align + ' ' + this.order + ' ' + responsive 
            console.log ( css )
            this.$emit('input', css )
        },
        /*
        update(){
            this.responsive.order && this.items.order ?
                this.items.order = this.items.order + ' md:order-none': null
            this.$emit('input', Object.values ( this.items ).join(' ') )
            this.$emit('css', Object.values ( this.items ).join(' ') )
        }
        */
    }

}
</script>