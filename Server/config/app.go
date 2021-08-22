package config

import "github.com/spf13/viper"

// 应用配置
type appConfig struct {
	Env  string
	Name string
	Host string
	Port string
}

func initApp(env string, cfg *viper.Viper) *appConfig {
	return &appConfig{
		Env:  env,
		Name: cfg.GetString("name"),
		Host: cfg.GetString("host"),
		Port: cfg.GetString("port"),
	}
}
