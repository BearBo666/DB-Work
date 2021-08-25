package routes

import (
	"DB-Server/app/handles"
	"DB-Server/app/middlewares"

	"github.com/gin-gonic/gin"
)

func categoryRoute(r *gin.Engine) {
	router := r.Group("/category")
	router.POST("/add", middlewares.AdminToken(), handles.AddCate)
	router.GET("/list", handles.GetCateList)
}
