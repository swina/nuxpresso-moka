const user = {
    state: {
        login: false,
        user: null,
        dashboard: 'MokaHome'
    },
    mutations: {
        login ( state , login ){
            state.login = login
        },
        user ( state , user ){
            state.user = user
        },
        dashboard ( state , dashboard ){
            state.dashboard = dashboard
        }
    },
    actions: {
        login( { commit } , login ){
            commit ( 'login' , login )
        },
        user( { commit } , user ){
            commit ( 'user' , user )
        },
        dashboard ( { commit } , dashboard ){
            commit ( 'dashboard' , dashboard )
        }
    }

}
export default user