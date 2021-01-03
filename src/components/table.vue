<template>
        <!-- COMPONENTS TABLE -->
        <div class="flex flex-row w-full p-2 cursor-pointer">
            <table class="w-full border text-sm text-left p-1">
                    <thead class="bg-gray-200">
                        <template v-for="(col,c) in wcolumns[$attrs.ctx]">
                            <th :key="'th_' + c" class="text-left p-2">{{ col.label }}</th>
                        </template>
                        <th></th>
                    </thead>
                    <tr :key="'row_' + w" v-for="(widget,w) in $attrs.components" class="hover:bg-blue-200 p-1 border-b-2 cursor-pointer" @click="$emit('component',widget,w)">
                       
                        <template v-for="(col,c) in wcolumns[$attrs.ctx]">
                            <td :key="'td_' + c" class="p-2 align-top" v-if="!col.type && col.type != 'json'">
                                <span v-if="col.field!='image_uri'">
                                    <span v-if="col.field!='updated_at'">{{ widget[col.field] }}</span>
                                    <span v-else>{{ $moment ( widget[col.field].split('T')[0] ) }}</span>
                                </span>
                                <img v-if="col.field==='image_uri'" :src="widget[col.field]" width="80"/>

                            </td>
                            <td :key="'td_' + c" class="p-2 align-top" v-else>
                                <div v-if="col.enum && widget.json[col.field]" class="flex flex-col text-xs">
                                    <div v-for="(co,i) in widget.json[col.field]">
                                        {{ widget.json[col.field][i][col.sub] }}
                                    </div>
                                </div>
                                <div v-else>
                                    <span v-if="widget.json[col.field]">
                                        {{ widget.json[col.field][col.sub] }}
                                    </span>
                                </div>
                                                                   
                            </td>
                        </template>
                        <td></td>
                    </tr>    
                </table>
        </div> 
</template>

<script>
export default {
    data:()=>({
        wcolumns: {
            templates : [
                { field: 'id' , label: '#' , desc: ''},
                { field: 'name' , label: 'Name' , desc: 'name of the widget'},
                { field: 'homepage' , label : 'Homepage' , desc: 'Used for homepage' },
                { field: 'updated_at' , label: 'Updated' , desc: 'Updated at'},
            ],
            components : [
                { field: 'id' , label: '#' , desc: ''},
                { field: 'name' , label: 'Name' , desc: 'name of the widget'},
                { field: 'category' , label: 'Category' , desc: 'Component category' },
                { field: 'description' , label: 'Description' , desc: 'display a title'},
                { field: 'image_uri' , label: 'Image' , desc: 'preview image'},
                { field: 'updated_at' , label: 'Updated' , desc: 'Updated at'},
            ],
            blocks : [
                { field: 'id' , label: '#' , desc: ''},
                { field: 'name' , label: 'Name' , desc: 'name of the widget'},
                { field: 'description' , label: 'Description' , desc: 'description'},
                { field: 'image_uri' , label: 'Image' , desc: 'preview image'},
                { field: 'updated_at' , label: 'Updated' , desc: 'Updated at'}
                
            ]
        },
    })
}
</script>