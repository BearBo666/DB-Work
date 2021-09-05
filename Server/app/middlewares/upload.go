package middlewares

import (
	"DB-Server/app/dto"
	"fmt"
	"os"
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
		fmt.Println(file.Filename, os.Args[0])
		if err != nil {
			c.JSON(200, dto.Error())
			return
		}

		c.JSON(200, dto.Ok())
	}
}
