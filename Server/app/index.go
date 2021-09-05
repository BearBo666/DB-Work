package app

import (
	"DB-Server/app/middlewares"
	"DB-Server/app/routes"
	"DB-Server/config"
	"log"

	"github.com/gin-gonic/gin"
)

// 初始化应用
func InitApp() {

	gin.SetMode(gin.ReleaseMode)
	// 实例化gin对象
	app := gin.Default()

	// 注册路由
	routes.RegisterRoutes(app)

	port := ":" + config.AppConfig.Port
	log.Println("服务开启,运行环境:"+config.AppConfig.Env, "端口"+port)

	app.Use(middlewares.Cors())
	err := app.Run(port)

	if err != nil {
		log.Println(err)
		panic("服务启动失败")
	}

}
