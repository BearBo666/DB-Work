// 使用sass作为全局变量
const { override, adjustStyleLoaders } = require("customize-cra");

module.exports = override(
    adjustStyleLoaders(rule => {
        if (rule.test.toString().includes('scss')) {
            rule.use.push({
                loader: require.resolve('sass-resources-loader'),
                options: {
                    resources: [
                        './src/style/settings/var.scss',
                    ]
                }
            });
        }
    })
);