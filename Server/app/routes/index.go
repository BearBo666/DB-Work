package routes

import "github.com/gin-gonic/gin"

func RegisterRoutes(r *gin.Engine) {
	// 注册用户路由
	userRoute(r)
}
