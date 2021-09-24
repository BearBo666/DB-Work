package dto

import "DB-Server/models"

type UserForm struct {
	UserName string `form:"userName" binding:"required"`
	Password string `form:"password" binding:"required"`
}

type PioneerForm struct {
	Name       string         `form:"name" binding:"required"`
	Title      string         `form:"title" binding:"required"`
	Email      string         `form:"email" binding:"required"`
	Introduce  string         `form:"introduce" binding:"required"`
	Avatar     string         `form:"avatar"`
	FreeTime   string         `form:"freeTime" binding:"required"`
	CategoryId []int          `form:"categoryId" binding:"required"`
	Topics     []models.Topic `form:"topics" binding:"required"`
}

type CategoryForm struct {
	CategoryName string `form:"categoryName" binding:"required"`
	IconClass    string `form:"iconClass" binding:"required"`
}

type ArticleForm struct {
	Title   string `form:"title" binding:"required"`
	Content string `form:"content" binding:"required"`
}
