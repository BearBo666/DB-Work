package config

import (
	"flag"
	"fmt"

	"github.com/spf13/viper"
)

var DBConfig = new(dbConfig)
var AppConfig = new(appConfig)
var Setting = new(setting)

// 初始化配置
func InitConfig() {
	var path, env string
	// 命令行读入参数-c、-e到path、env变量
	flag.StringVar(&env, "e", "development", "环境变量")
	flag.StringVar(&path, "c", "config.yml", "配置文件路径")
	flag.Parse()

	// viper对象
	v := viper.New()
	// 配置路径
	v.SetConfigFile(path)
	// 读取文件内容
	if err := v.ReadInConfig(); err != nil {
		panic(fmt.Errorf("读取配置文件出错:%s\n", err))
	}

	// 提取app配置
	cfgApp := v.Sub("app")
	if cfgApp == nil {
		panic("未配置app参数")
	}
	// 初始化app配置
	AppConfig = initApp(env, cfgApp)
	// 提取设置参数
	cfgSetting := v.Sub("setting")
	Setting = initSetting(cfgSetting)
	// 提取数据库配置
	cfgDB := v.Sub(env)
	if cfgDB == nil {
		panic("未配置数据库信息或环境变量错误")
	}
	DBConfig = initDatebase(cfgDB)
}
