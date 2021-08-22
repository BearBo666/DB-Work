package dto

type LoginForm struct {
	UserName string `form:"userName" binding:"required"`
	Password string `form:"password" binding:"required"`
}
