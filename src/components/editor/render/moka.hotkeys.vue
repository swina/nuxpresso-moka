<template>
    <div class="grid grid-cols-2 p-2 border gap-1 shadow-lg" @click="$emit('close')">
        <label class="font-bold border-b">General</label>
        <div class="border-b"></div>

        <label class="font-bold border-b border-b">Alt + b</label>
        <div class="border-b">Preview</div>

        <label class="font-bold border-b border-b">Alt + i</label>
        <div class="border-b">Add reusable</div>
        
        <label class="font-bold border-b border-b">Alt + s</label>
        <div class="border-b">Save (in preview mode save screenshot too)</div>

        <label class="font-bold border-b border-b">Current element</label>
        <div class="border-b"></div>

        <label class="font-bold border-b border-b">Alt + q</label>
        <div class="border-b">Add element (apply to <i class="material-icons">select_all</i>)</div>

        <label class="font-bold border-b border-b">Alt + w</label>
        <div class="border-b">Edit element content</div>

        <label class="font-bold border-b border-b">Alt + i</label>
        <div class="border-b">Add element</div>

        <label class="font-bold border-b border-b">Alt + u</label>
        <div class="border-b">Add reusable</div>

        <label class="font-bold border-b">Alt + m</label>
        <div class="border-b">Move element up</div>

        <label class="font-bold border-b">Alt + z</label>
        <div class="border-b">Style</div>

        <label class="font-bold border-b">Alt + d</label>
        <div class="border-b">Duplicate element</div>

        <label class="font-bold border-b">Alt + c</label>
        <div class="border-b">Copy element</div>

        <label class="font-bold border-b">Alt + v</label>
        <div class="border-b">Paste element</div>

        <label class="font-bold border-b">Alt + g</label>
        <div class="border-b">Copy classes</div>

        <label class="font-bold border-b">Alt + h</label>
        <div class="border-b">Paste classes</div>

        <label class="font-bold border-b">Alt + a</label>
        <div class="border-b">Animation </div>

        <label class="font-bold border-b">Alt + o</label>
        <div class="border-b">Current block screenshot </div>

        <label class="font-bold border-b">Alt + r</label>
        <div class="border-b">Remove </div>

    </div>
</template>