package routes

import (
	"DB-Server/app/handles"
	"DB-Server/app/middlewares"

	"github.com/gin-gonic/gin"
)

func pioneerRoute(r *gin.Engine) {
	route := r.Group("/pioneer")
	// 前人列表
	route.GET("/list", handles.PioneerList)
	// 某一领域前人
	route.GET("/listByCate", handles.PioneerListByCate)
	// 申请称为前人
	route.POST("/apply", middlewares.CheckToken(), handles.ApplyPioneer)
}
