package routes

import (
	"DB-Server/app/handles"
	"DB-Server/app/middlewares"

	"github.com/gin-gonic/gin"
)

func userRoute(r *gin.Engine) {
	route := r.Group("/user")
	// 登录
	route.POST("/login", handles.Login)
	// 注册
	route.POST("/register", handles.Register)
	// 用户列表
	route.GET("/list", middlewares.AdminToken(), handles.UserList)
}
