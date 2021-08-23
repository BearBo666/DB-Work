package config

import (
	"strconv"

	"github.com/spf13/viper"
)

// 全局设置
type setting struct {
	JwtSecret  string
	JwtTimeout int
}

func initSetting(cfg *viper.Viper) *setting {
	// 字符串转数字
	timeout, _ := strconv.Atoi(cfg.GetString("jwtTimeout"))
	return &setting{
		JwtSecret:  cfg.GetString("jwtSecret"),
		JwtTimeout: timeout,
	}
}
