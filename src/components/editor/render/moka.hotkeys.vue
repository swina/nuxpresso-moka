<template>
    <div class="grid grid-cols-2 p-2 shadow-lg" @click="$emit('close')">
        <label class="font-bold">General</label>
        <div></div>

        <label class="font-bold">Alt + b</label>
        <div>Preview</div>

        <label class="font-bold">Alt + i</label>
        <div>Add reusable</div>
        
        <label class="font-bold">Alt + s</label>
        <div>Save (in preview mode save screenshot too)</div>

        <label class="font-bold">Current element</label>
        <div></div>

        <label class="font-bold">Alt + q</label>
        <div>Add element (apply to <i class="material-icons">select_all</i>)</div>

        <label class="font-bold">Alt + i</label>
        <div>Add reusable</div>

        <label class="font-bold">Alt + z</label>
        <div>Style</div>

        <label class="font-bold">Alt + d</label>
        <div>Duplicate element</div>

        <label class="font-bold">Alt + c</label>
        <div>Copy element</div>

        <label class="font-bold">Alt + v</label>
        <div>Paste element</div>

        <label class="font-bold">Alt + g</label>
        <div>Copy classes</div>

        <label class="font-bold">Alt + h</label>
        <div>Paste classes</div>

        <label class="font-bold">Alt + a</label>
        <div>Animation </div>

        <label class="font-bold">Alt + r</label>
        <div>Remove </div>

    </div>
</template>