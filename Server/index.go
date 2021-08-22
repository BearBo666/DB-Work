package main

import (
	"DB-Server/app/dao"
	"DB-Server/config"
	"DB-Server/models"
	"fmt"
)

func main() {
	// 初始化配置
	config.InitConfig()
	// 连接数据库
	// database.OpenDataBase()

	_, err := dao.UserDao.Create("熊博", "1111")
	fmt.Println(err)

	// x, e := dao.UserDao.FindOne("熊博", "1111")
	// fmt.Println(x, e)
	topics := make([]models.Topic, 0)
	topics = append(topics, models.Topic{Title: "前端", Content: "我擅长前端....."})
	_, er := dao.PioneerDao.Create(1, "熊博", "硕士", "14@qq.com", "自我介绍", "www.baidu.com", "周三有空", topics)
	fmt.Println(er)

	// y, _ := dao.PioneerDao.FindOne(1)
	// fmt.Println(y.Topics)
	// database.InitTable()
	// x, y := dao.CategoryDao.FindAll()
	// fmt.Println(x, y)
	// 初始化应用
	// app.InitApp()
}
