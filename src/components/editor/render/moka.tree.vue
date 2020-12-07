<template>
    <div class="absolute text-xs font-sans w-full overflow-y-auto">
        <i class="material-icons absolute top-0 right-0 m-1" @click="$emit('close')">close</i>
        <div class="items-center flex flex-row" @click="current=null,$emit('treeroot')"><i class="material-icons">web</i> Root</div>
        <ul class="tree">
            <li class="list-none" :key="block.id" v-for="(block,b) in doc.blocks">
                <div class="hover:bg-gray-300 items-center flex flex-row"  @click="current=block.id,$emit('treeselect',[b],block)"><i class="material-icons">{{ block.icon}}</i>&lt;{{ block.element }}&gt; </div>
                <ul v-if="current===block.id" class="tree">
                    <li class="list-none" :key="container.id" v-for="(container,c) in block.blocks" >
                        <div class="hover:bg-gray-300 items-center flex flex-row" @click="$emit('treeselect',[b,c],container)"><i class="material-icons">select_all</i> &lt;div&gt; </div>
                        <ul class="tree">
                            <li class="list-none" :key="element.id" v-for="(element,e) in container.blocks">
                                <div class="hover:bg-gray-300 items-center flex flex-row" @click="$emit('treeselect',[b,c,e],element)"><i class="material-icons">{{ element.icon}}</i>&lt;{{ element.element }}&gt; </div>
                                <div v-if="element.hasOwnProperty('blocks')">
                                    <ul class="tree">
                                         <li class="list-none" :key="subcontainer.id" v-for="(subcontainer,s) in element.blocks">
                                            <div class="hover:bg-gray-300 items-center flex flex-row" @click="$emit('treeselect',[b,c,e,s],subcontainer)"><i class="material-icons" v-if="subcontainer.icon">{{subcontainer.icon}}</i><i class="material-icons" v-else>select_all</i> &lt;<span v-if="subcontainer.element">{{subcontainer.element}}</span><span v-else>div</span>&gt; </div>
                                            <ul class="tree">
                                                <li class="list-none" :key="el.id" v-for="(el,i) in subcontainer.blocks">
                                                    <div class="hover:bg-gray-300 items-center flex flex-row" @click="$emit('treeselect',[b,c,e,s,i],el)"><i class="material-icons">{{ el.icon}}</i>&lt;{{ el.element }}&gt;</div>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'MokaDocTree',
    data:()=>({
        current: null
    }),
    props: [ 'doc' ],
    methods:{
    }

}
</script>

<style>
ul.tree { margin-left:.5rem; margin-bottom:2px; margin-top:2px;}
ul.tree > li { margin-left: .4rem; margin-bottom:2px; margin-top:2px; }
</style>