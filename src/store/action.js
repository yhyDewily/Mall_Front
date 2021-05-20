/**
 * 商城Vuex-actions
 */
export default {
    saveUserName(context,username){
        context.commit('saveUserName', username);
    },
    saveCartCount(context, count) {
        context.commit('saveCartCount', count);
    },
    saveHotProducts(context, hotProducts) {
        context.commit('saveHotProducts', hotProducts)
    },
    saveRecommend(context, recommendProducts) {
        context.commit('saveRecommend', recommendProducts)
    }
}
