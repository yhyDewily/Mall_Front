/**
 * 商城Vuex-mutations
 */
export default {
     saveUserName(state, username) {
        state.username = username;
    },
    saveCartCount(state, count) {
        state.cartCount = count;
    },
    saveHotProducts(state, hotProducts) {
         state.hotProducts = hotProducts;
    },
    saveRecommend(state, recommendProducts) {
         state.recommendProducts = recommendProducts
    }
}
