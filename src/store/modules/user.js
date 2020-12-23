const user = {
    state: {
        login: false,
        user: null,
        dashboard: 'MokaHome',
        production: {
            url: process.env.VUE_APP_PRODUCTION_URL || null
        },
        build: process.env.VUE_APP_NUXPRESSO_BUILD || null
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
        },
        production ( state , production ){
            state.production = production
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
        },
        production ( { commit } , production ){
            commit ( 'production' , production )
        }
    }

}
export default user