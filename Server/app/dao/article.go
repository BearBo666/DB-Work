package dao

import (
	. "DB-Server/database"
	. "DB-Server/models"
)

type IArticleDao struct{}

var ArticleDao IArticleDao

// 获得前人的某一篇文章
func (dao *IArticleDao) FindOne(articleId int) (article *Article, err error) {
	err = GDB.
		Order("createdAt DESC").
		Where(&Article{ArticleId: articleId}).
		First(article).Error

	if err != nil {
		return nil, err
	}

	return
}

// 创建一篇文章
func (dao *IArticleDao) Create(pioneerId int, title, content string) (err error) {
	err = GDB.Create(&Article{PioneerId: pioneerId, Title: title, Contnet: content}).Error

	return err
}

// 分页查找一个前人的文章
func (dao *IArticleDao) FindByPioneerId(pioneerId, currentPage, pageNum int) (articleList []Article, err error) {
	// 忽略content，减少传输体积
	err = GDB.
		Omit("content").
		Order("createdAt DESC").
		Limit(pageNum).Offset((currentPage - 1) * pageNum).
		Find(&articleList).Error

	return
}
