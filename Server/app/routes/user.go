package routes

import (
	"DB-Server/app/handles"

	"github.com/gin-gonic/gin"
)

func userRoute(r *gin.Engine) {
	route := r.Group("/user")
	route.POST("/login", handles.Login)
	route.POST("/register", handles.Register)
}
