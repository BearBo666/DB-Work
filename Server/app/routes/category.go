package routes

import (
	"DB-Server/app/handles"

	"github.com/gin-gonic/gin"
)

func categoryRoute(r *gin.Engine) {
	router := r.Group("/category")
	router.POST("/add", handles.AddCate)
}
