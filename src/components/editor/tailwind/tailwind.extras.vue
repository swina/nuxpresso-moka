<template>
    <div class="flex flex-col">
        <label>Rounded</label>
        <select class="dark" v-model="rounded">
            <option value=""></option>
            <option :key="round" v-for="round in rounds" :value="round">{{ round }}</option>
        </select>
        <label>Shadow</label>
        <select class="dark" v-model="shadow">
            <option value=""></option>
            <option :key="shad" v-for="shad in shadows" :value="shad">{{ shad }}</option>
        </select>
    </div>
</template>


<script>
export default {
    name: 'MokaTailwindExtras',
    data:()=>({
        rounded:'',
        rounds: [
            'rounded-none',
            'rounded-sm',
            'rounded',
            'rounded-md',
            'rounded-lg',
            'rounded-xl',
            'rounded-2xl',
            'rounded-3xl',
            'rounded-full'
        ],
        shadow:'',
        shadows : [
            'shadow',
            'shadow-xs',
            'shadow-sm',
            'shadow-md',
            'shadow-lg',
            'shadow-xl',
            'shadow-2xl'
        ]
    }),
    props: [ 'css'],
    mounted(){
        if ( !this.css ) return
        let classi = this.css.split ( ' ' )
        classi.forEach ( cl => {
            this.rounds.forEach ( rd => {
                if ( cl.indexOf ( rd ) > -1 ){
                    this.rounded = rd
                }
            })
            this.shadows.forEach ( sh => {
                if ( cl.indexOf ( sh ) > -1 ){
                    this.shadow = sh
                }
            })
            this.update()
        })
    },
    watch: {
        rounded(v){
            this.update()
        },
        shadow(v){
            this.update()
        }
    },
    methods: {
        update(){
            this.$emit ( 'input' , this.$clean(this.rounded + ' ' + this.shadow) )
            this.$emit ( 'css' , this.rounded )
            this.$emit ( 'css' , this.shadow )
        }
    }

}
</script>