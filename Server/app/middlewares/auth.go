package middlewares

import (
	"DB-Server/app/dto"
	"DB-Server/helpers"

	"github.com/gin-gonic/gin"
)

func CheckToken() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("token")

		if token == "" {
			c.Abort()
			c.JSON(200, dto.FailAndMsg("无登录凭证"))
		} else {
			claim, err := helpers.VerifyToken(token)
			if err != nil {
				c.Abort()
				c.JSON(200, dto.FailAndMsg("登录凭证无效或已过期"))
			} else {
				c.Set("userId", claim.UserId)
				c.Next()
			}
		}
	}
}
