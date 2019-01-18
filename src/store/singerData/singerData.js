// 歌手详情
const singerData = {
    state: {
        singers: {},
        count: 5
    },
    mutations: {
        setSinger(state, singer) {
            state.singers = singer
        }
    },
    getters: {
        getSinger: (state) => {
            return state.singers
        }
    },
    actions: {
        setSingers(context, singer) {
            context.commit('setSinger', singer)
        }
    }

};

export default singerData;