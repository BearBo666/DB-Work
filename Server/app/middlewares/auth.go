package middlewares

import (
	"DB-Server/app/dao"
	"DB-Server/app/dto"
	"DB-Server/helpers"

	"github.com/gin-gonic/gin"
)

// 检查用户token
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

// 检查管理员token
func AdminToken() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("x-auth-token")

		if token == "" {
			c.Abort()
			c.JSON(200, dto.FailAndMsg("无管理员凭证"))
		} else {
			claim, err := helpers.VerifyToken(token)
			if err != nil {
				c.Abort()
				c.JSON(200, dto.FailAndMsg("管理员凭证无效或已过期"))
			} else {
				c.Set("adminId", claim.UserId)
				c.Next()
			}
		}
	}
}

// 检查一个用户是否是"前人"
func IsPioneer() gin.HandlerFunc {
	return func(c *gin.Context) {
		u, o := c.Get("userId")
		userId, ok := u.(int)
		if !ok || !o {
			c.Abort()
			c.JSON(200, dto.Error())
		} else {
			pioneer, err := dao.PioneerDao.FindByUserId(userId)
			if err != nil {
				c.Abort()
				c.JSON(200, dto.Error())
			} else {
				c.Set("pioneerId", pioneer.PioneerId)
				c.Next()
			}
		}

	}
}
