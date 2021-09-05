package routes

import (
	"DB-Server/app/handles"
	"DB-Server/app/middlewares"

	"github.com/gin-gonic/gin"
)

func adminRoute(r *gin.Engine) {
	router := r.Group("/admin")
	router.POST("/login", handles.AdminLogin)
	// 有管理员token才能注册管理员
	router.POST("/register", middlewares.AdminToken(), handles.AdminRegister)
	// 管理员列表
	router.GET("/list", middlewares.AdminToken(), handles.AdminList)
}
