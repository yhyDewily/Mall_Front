module.exports = {
    devServer:{
        host:'127.0.0.1',
        port:8080,
        disableHostCheck: true
        // proxy:{
        //     '/api':{
        //         target:'http://mall-pre.springboot.cn',
        //         changeOrigin:true,
        //         pathRewrite:{
        //             '/api':''
        //         }
        //     }
        // }
    },
    // publicPath:'/app',
    // outputDir:'dist',
    // indexPath:'index2.html',
    // lintOnSave:false,
    productionSourceMap:true,
    chainWebpack:(config)=>{
        config.plugins.delete('prefetch');
    }
}
