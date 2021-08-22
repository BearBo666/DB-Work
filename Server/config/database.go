package config

import "github.com/spf13/viper"

// 数据库配置
type dbConfig struct {
	Driver string
	Source string
}

// 初始化数据库配置
func initDatebase(cfg *viper.Viper) *dbConfig {
	return &dbConfig{
		Driver: cfg.GetString("driver"),
		Source: cfg.GetString("source"),
	}
}
