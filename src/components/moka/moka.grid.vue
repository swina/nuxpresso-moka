<template>
    <div class="absolute top-0 w-full mt-8 left-0 flex flex-row flex-wrap">
        <div v-for="n in 144" :class="'w-1/12 h-1/12 text-xs border ' + active(n)" @click="addCell(n)">
            {{ parseInt(n/12) +1 }}:{{ n-(parseInt((n-1)/12)*12)}}
        </div>
    </div>
</template>

<script>
export default {
    data:()=>({
        cells: []
    }),
    methods:{
        active(n){
            return this.cells.indexOf( n ) > -1 ? ' bg-gray-200' : ' bg-white'
        },
        addCell(n){
            this.cells.indexOf( n ) > -1 ? 
                this.cells.splice ( this.cells.indexOf ( n ) , 1 )
                    : this.cells.push ( n )
        }
    }
}
</script>