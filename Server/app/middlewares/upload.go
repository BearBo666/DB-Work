package middlewares

import (
	"DB-Server/app/dao"
	"DB-Server/app/dto"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

func Avatar() gin.HandlerFunc {
	return func(c *gin.Context) {
		file, err := c.FormFile("avatar")
		if err != nil {
			c.JSON(200, dto.Fail())
			return
		}
		// 保存文件
		err = c.SaveUploadedFile(file, filepath.Join("./upload", filepath.Base(file.Filename)))
		// 如果保存出错
		if err != nil {
			c.JSON(200, dto.Error())
			return
		}
		// 更新此前人的信息
		pioneerId, _ := c.Get("pioneerId")
		id := pioneerId.(int)
		err = dao.PioneerDao.Update(id, file.Filename)

		if err != nil {
			c.JSON(200, dto.Error())
			return
		}

		c.JSON(200, dto.Ok())
	}
}
