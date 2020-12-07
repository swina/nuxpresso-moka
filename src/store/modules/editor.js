const editor = {
    state: {
        current: null,
        action: null,
        level: null,
        parent: null
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
        }
    }

}

export default editor