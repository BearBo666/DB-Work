package dto

type UserForm struct {
	UserName string `form:"userName" binding:"required"`
	Password string `form:"password" binding:"required"`
}
