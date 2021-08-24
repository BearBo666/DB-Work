package routes

import (
	"DB-Server/app/handles"
	"DB-Server/app/middlewares"

	"github.com/gin-gonic/gin"
)

func pioneerRoute(r *gin.Engine) {
	route := r.Group("/pioneer")
	route.GET("/list", handles.PioneerList)
	route.GET("/listByCate", handles.PioneerListByCate)
	route.POST("/apply", middlewares.CheckToken(), handles.ApplyPioneer)
}
