package handles

import (
	"DB-Server/app/dao"
	"DB-Server/app/dto"
	"strconv"

	"github.com/gin-gonic/gin"
)

// 前人发布文章
func AddArticle(r *gin.Context) {
	var body dto.ArticleForm
	pioneerId := r.GetInt("pioneerId")
	if r.ShouldBind(&body) != nil || pioneerId == 0 {
		r.JSON(200, dto.FailAndMsg("参数不全"))
	} else {
		err := dao.ArticleDao.Create(pioneerId, body.Title, body.Content)
		if err != nil {
			r.JSON(200, dto.Error())
		} else {
			r.JSON(200, dto.Ok())
		}
	}
}

// 查找某个前人的文章
func ArticleByPioneer(r *gin.Context) {
	pioneerId, _ := strconv.Atoi(r.Query("pioneerId"))
	currentPage, e1 := strconv.Atoi(r.DefaultQuery("currentPage", "1"))
	pageNum, e2 := strconv.Atoi(r.DefaultQuery("pageNum", "20"))
	if e1 != nil {
		currentPage = 1
	}
	if e2 != nil {
		pageNum = 20
	}
	if pioneerId == 0 {
		r.JSON(200, dto.FailAndMsg("参数不全"))
	} else {
		list, err := dao.ArticleDao.FindByPioneerId(pioneerId, currentPage, pageNum)
		if err != nil {
			r.JSON(200, dto.Error())
		} else {
			r.JSON(200, dto.OkAndData(list))
		}
	}
}

// 获得某篇文章的详情
func ArticleDetail(r *gin.Context) {
	articleId, _ := strconv.Atoi(r.Query("articleId"))
	if articleId == 0 {
		r.JSON(200, dto.FailAndMsg("未传递参数"))
	} else {
		article, err := dao.ArticleDao.FindOne(articleId)
		if err != nil {
			r.JSON(200, dto.Error())
		} else {
			r.JSON(200, dto.OkAndData(article))
		}
	}
}
