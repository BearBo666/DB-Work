package handles

import (
	. "DB-Server/app/dao"
	"DB-Server/app/dto"
	"fmt"
	"strconv"

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

// 更新分类内容
func UpdateCate(c *gin.Context) {
	categoryId, _ := strconv.Atoi(c.PostForm("categoryId"))
	categoryName := c.PostForm("categoryName")
	iconClass := c.PostForm("iconClass")

	if categoryId != 0 {
		params := make(map[string]interface{})
		if categoryName != "" {
			params["categoryName"] = categoryName
		}
		if iconClass != "" {
			params["iconClass"] = iconClass
		}

		err := CategoryDao.Update(categoryId, params)

		if err != nil {
			c.JSON(200, dto.Error())
		} else {
			c.JSON(200, dto.Ok())
		}
	} else {
		c.JSON(200, dto.FailAndMsg("参数不全"))
	}
}

// 删除分类
func DeleteCate(c *gin.Context) {
	categoryId := c.PostForm("categoryId")
	fmt.Println(categoryId)
	if categoryId == "" {
		c.JSON(200, dto.FailAndMsg("参数不全"))
		return
	}

	id, _ := strconv.Atoi(categoryId)

	err := CategoryDao.Delete(id)
	if err != nil {
		c.JSON(200, dto.Error())
	} else {
		c.JSON(200, dto.Ok())
	}
}
