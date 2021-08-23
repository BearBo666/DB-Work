package main

import (
	"DB-Server/config"
	"DB-Server/database"
	"DB-Server/helpers"
	"fmt"
)

func main() {
	// 初始化配置
	config.InitConfig()
	// 连接数据库
	database.OpenDataBase()

	fmt.Println(helpers.Sha256Crypto("xiong"))

	// 初始化应用
	// app.InitApp()
}
