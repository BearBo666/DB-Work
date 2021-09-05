package handles

import (
	"DB-Server/app/dao"
	"DB-Server/app/dto"
	"DB-Server/helpers"
	"strconv"

	"github.com/gin-gonic/gin"
)

// 管理员登录
func AdminLogin(r *gin.Context) {
	var body dto.UserForm
	if r.ShouldBind(&body) != nil {
		r.JSON(200, dto.FailAndMsg("未传递用户名或密码"))
	} else {
		admin, err := dao.AdminDao.FindOne(body.UserName, body.Password)
		if err != nil {
			r.JSON(200, dto.Fail())
		} else {
			token, e := helpers.SignToken(admin.AdminId)
			if e != nil {
				r.JSON(200, dto.Error())
			} else {
				r.JSON(200, dto.OkAndData(token))
			}
		}
	}
}

// 管理员注册
func AdminRegister(r *gin.Context) {
	var body dto.UserForm
	if r.ShouldBind(&body) != nil {
		r.JSON(200, dto.FailAndMsg("未传递用户名或密码"))
	} else {
		err := dao.AdminDao.Create(body.UserName, body.Password)
		if err != nil {
			r.JSON(200, dto.Fail())
		} else {
			r.JSON(200, dto.Ok())
		}
	}
}

// 管理员列表
func AdminList(r *gin.Context) {
	pageNum, _ := strconv.Atoi(r.DefaultQuery("pageNum", "20"))
	currentPage, _ := strconv.Atoi(r.DefaultQuery("currentPage", "1"))

	admins, err := dao.AdminDao.FindAll(currentPage, pageNum)
	if err != nil {
		r.JSON(200, dto.Error())
	} else {
		r.JSON(200, dto.OkAndData(admins))
	}
}
