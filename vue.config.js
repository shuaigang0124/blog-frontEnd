module.exports = {
    lintOnSave: false,       //关闭eslint检查
    outputDir: 'dist',      //打包输出文件夹名
    assetsDir: 'assets',    //打包静态资源文件夹名
    parallel: false,
    publicPath: '/',
    devServer: {
        // open: true, //auto open brower 项目启动后自动打开浏览器
        // host: 'localhost',
        // port: 8080,         //端口号默认8080

        // 自动判断当前环境为开发还是线上
        proxy: process.env.NODE_ENV === 'production' ?
            {
                '/meiqi': {
                    //对应自己的 跨域地址 即请求的后端地址
                    // 服务器
                    target: 'http://服务器ip地址:9527',
                    ws: true,   //代理websokets
                    changeOrigin: true,  //是否跨域，虚拟的站点需要更管origin
                    pathRewrite: {
                        '^/meiqi': '',
                    },
                },
            }
            :
            {
                '/api': {
                    //对应自己的 跨域地址 即请求的后端地址
                    // 本地开发
                    target: 'http://localhost:9527',
                    ws: true,   //代理websokets
                    changeOrigin: true,  //是否跨域，虚拟的站点需要更管origin
                    pathRewrite: {
                        '^/api': '',
                    },
                },
            },
    },
}