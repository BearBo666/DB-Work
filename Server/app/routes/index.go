package routes

import "github.com/gin-gonic/gin"

func RegisterRoutes(r *gin.Engine) {
	// 注册用户路由
	userRoute(r)
	// 前人路由
	pioneerRoute(r)
	// 分类路由
	categoryRoute(r)
	// 管理员
	adminRoute(r)
	// 文章
	articleRoute(r)
}
