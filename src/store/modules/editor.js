const editor = {
    state: {
        current: null,
        action: null,
        level: null,
        parent: null,
        autosave: null
    },
    mutations: {
        current ( state , current ){
            state.current = current
        },
        action ( state , action ){
            state.action = action
        },
        level ( state , level ){
            state.level = level
        },
        parent ( state , parent ){
            state.parent = parent
        },
        autosave ( state , blocks ){
            state.autosave = blocks
        }
    },
    actions: {
        setCurrent ( { commit } , current ){
            commit ( 'current' , current )
        },
        setAction ( { commit } , action ){
            commit ( 'action' , action )
        },
        setLevel ( { commit } , level ){
            commit ( 'level' , level )
        },
        setParent ( { commit } , parent ){
            commit ( 'parent' , parent)
        },
        autoSave ( { commit } , blocks ){
            commit ( 'autosave' , blocks )
        }
    }

}

export default editor