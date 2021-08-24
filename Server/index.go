package main

import (
	"DB-Server/app"
	"DB-Server/config"
	"DB-Server/database"
)

func main() {
	// 初始化配置
	config.InitConfig()
	// 连接数据库
	database.OpenDataBase()

	// 初始化应用
	app.InitApp()
}
