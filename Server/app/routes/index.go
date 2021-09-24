package routes

import (
	"DB-Server/app/middlewares"

	"github.com/gin-gonic/gin"
)

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
	// 静态资源托管
	r.Static("/upload", "./upload")
	// 上传中间件
	uploader := r.Group("/upload")
	{
		r.MaxMultipartMemory = 8 << 20 // 最大上传
		// 头像
		uploader.POST("/avatar", middlewares.CheckToken(), middlewares.IsPioneer(), middlewares.Avatar())
	}
}
