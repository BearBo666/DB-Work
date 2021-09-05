package routes

import (
	"DB-Server/app/handles"
	"DB-Server/app/middlewares"

	"github.com/gin-gonic/gin"
)

func categoryRoute(r *gin.Engine) {
	router := r.Group("/category")
	// 添加分类
	router.POST("/add", middlewares.AdminToken(), handles.AddCate)
	// 更新分类
	router.POST("/update", middlewares.AdminToken(), handles.UpdateCate)
	// 删除分类
	router.POST("/delete", middlewares.AdminToken(), handles.DeleteCate)
	// 分类列表
	router.GET("/list", handles.GetCateList)
}
