package handles

import (
	. "DB-Server/app/dao"
	"DB-Server/app/dto"

	"github.com/gin-gonic/gin"
)

// 创建分类
func AddCate(c *gin.Context) {
	var body dto.CategoryForm
	if c.ShouldBind(&body) != nil {
		c.JSON(200, dto.FailAndMsg("参数不全"))
	} else {
		_, err := CategoryDao.Create(body.CategoryName, body.IconClass)
		if err != nil {
			c.JSON(200, dto.Error())
		} else {
			c.JSON(200, dto.Ok())
		}
	}
}

// 获得所有分类
func GetCateList(c *gin.Context) {
	list, err := CategoryDao.FindAll()
	if err != nil {
		c.JSON(200, dto.Error())
	} else {
		c.JSON(200, dto.OkAndData(list))
	}
}
