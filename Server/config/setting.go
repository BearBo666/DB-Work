package config

import "github.com/spf13/viper"

// 全局设置
type setting struct {
	JwtSecret  string
	JwtTimeout string
}

func initSetting(cfg *viper.Viper) *setting {
	return &setting{
		JwtSecret:  cfg.GetString("jwtSecret"),
		JwtTimeout: cfg.GetString("jwtTimeout"),
	}
}
