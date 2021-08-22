package main

import (
	"DB-Server/app/dao"
	"DB-Server/config"
	"fmt"
)

func main() {
	// 初始化配置
	config.InitConfig()
	// 连接数据库
	// database.OpenDataBase()

	_, err := dao.UserDao.Create("熊博", "1111")
	fmt.Println(err)

	x, e := dao.UserDao.FindOne("熊博", "1111")
	fmt.Println(x, e)
	// 初始化应用
	// app.InitApp()
}
