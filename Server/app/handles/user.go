package handles

import (
	. "DB-Server/app/dao"
	"DB-Server/app/dto"
	"DB-Server/helpers"

	"github.com/gin-gonic/gin"
)

// 登录
func Login(c *gin.Context) {
	var body dto.UserForm
	if c.ShouldBind(&body) == nil {
		user, err := UserDao.FindOne(body.UserName, body.Password)
		if err != nil {
			c.JSON(200, dto.FailAndMsg("用户名或密码错误"))
		}
		token, err := helpers.SignToken(user.UserName)
		if err != nil {
			c.JSON(200, dto.Error())
		}
		c.JSON(200, dto.OkAndData(token))
	} else {
		c.JSON(200, dto.FailAndMsg("未传递用户名或密码"))
	}
}

// 注册
func Register(c *gin.Context) {
	var body dto.UserForm
	if c.ShouldBind(&body) == nil {
		_, err := UserDao.Create(body.UserName, helpers.Sha256Crypto(body.Password))
		if err != nil {
			c.JSON(200, dto.Error())
		}
		c.JSON(200, dto.Ok())
	} else {
		c.JSON(200, dto.FailAndMsg("未传递用户名或密码"))
	}
}
