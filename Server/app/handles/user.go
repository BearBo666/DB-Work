package handles

import (
	"DB-Server/app/dto"

	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	var body dto.LoginForm
	if c.ShouldBind(&body) == nil {
		c.JSON(200, dto.Ok())
	} else {
		c.JSON(200, dto.FailAndMsg("未传递用户名或密码"))
	}
}
