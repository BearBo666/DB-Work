package routes

import (
	"DB-Server/app/handles"
	"DB-Server/app/middlewares"

	"github.com/gin-gonic/gin"
)

func articleRoute(r *gin.Engine) {
	router := r.Group("/article")
	// 前人发布文章
	router.POST("/add", middlewares.CheckToken(), middlewares.IsPioneer(), handles.AddArticle)
	// 某一前人的文章
	router.GET("/list", handles.ArticleByPioneer)
	// 某一文章的详情
	router.GET("/index", handles.ArticleDetail)
}
