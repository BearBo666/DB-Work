package handles

import (
	. "DB-Server/app/dao"
	"DB-Server/app/dto"
	"DB-Server/helpers"
	"strconv"

	"github.com/gin-gonic/gin"
)

// 登录
func Login(c *gin.Context) {
	var body dto.UserForm
	if c.ShouldBind(&body) == nil {
		user, err := UserDao.FindOne(body.UserName, helpers.Sha256Crypto(body.Password))
		if err != nil {
			c.JSON(200, dto.FailAndMsg("用户名或密码错误"))
		} else {
			token, err := helpers.SignToken(user.UserId)

			if err != nil {
				c.JSON(200, dto.Error())
			} else {
				c.JSON(200, dto.OkAndData(token))
			}
		}
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

// 用户列表
func UserList(c *gin.Context) {
	currentPage, _ := strconv.Atoi(c.DefaultQuery("currentPage", "0"))
	pageNum, _ := strconv.Atoi(c.DefaultQuery("pageNum", "20"))
	userList, err := UserDao.FindAll(currentPage, pageNum)
	if err != nil {
		c.JSON(200, dto.Error())
	} else {
		c.JSON(200, dto.OkAndData(userList))
	}
}
