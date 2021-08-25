package routes

import (
	"DB-Server/app/handles"
	"DB-Server/app/middlewares"

	"github.com/gin-gonic/gin"
)

func articleRoute(r *gin.Engine) {
	router := r.Group("/article")
	// 获得token，检查是否是前人
	router.POST("/add", middlewares.CheckToken(), middlewares.IsPioneer(), handles.AddArticle)
	router.GET("/list", handles.ArticleByPioneer)
	router.GET("/index", handles.ArticleDetail)
}
