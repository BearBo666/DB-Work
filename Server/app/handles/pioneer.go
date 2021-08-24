package handles

import (
	. "DB-Server/app/dao"
	"DB-Server/app/dto"
	"DB-Server/helpers"
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
)

// 申请成为前人
func ApplyPioneer(c *gin.Context) {
	var body dto.PioneerForm
	// 参数校验
	if err := c.ShouldBind(&body); err != nil {
		fmt.Println(err)
		c.JSON(200, dto.FailAndMsg("参数不全"))
	} else {
		// token校验
		token := c.GetHeader("token")
		claim, err := helpers.VerifyToken(token)
		if err != nil {
			fmt.Println("@@@@")
			c.JSON(200, dto.FailAndMsg("无登录凭证或凭证已失效"))
		} else {
			_, err = PioneerDao.Create(
				claim.UserId,
				body.CategoryId,
				body.Name,
				body.Title,
				body.Email,
				body.Introduce,
				body.Avatar,
				body.FreeTime,
				body.Topics,
			)

			if err != nil {
				c.JSON(200, dto.Error())
			} else {
				c.JSON(200, dto.Ok())
			}
		}
	}
}

// 前人列表
func PioneerList(c *gin.Context) {
	pageNum, _ := strconv.Atoi(c.DefaultQuery("pageNum", "20"))
	currentPage, _ := strconv.Atoi(c.DefaultQuery("currentPage", "1"))

	pioneerList, err := PioneerDao.FindByIds([]int{}, currentPage, pageNum)

	if err != nil {
		c.JSON(200, dto.Error())
	} else {
		c.JSON(200, dto.OkAndData(pioneerList))
	}
}

// 某一领域前人
func PioneerListByCate(c *gin.Context) {
	pageNum, _ := strconv.Atoi(c.DefaultQuery("pageNum", "20"))
	currentPage, _ := strconv.Atoi(c.DefaultQuery("currentPage", "1"))
	categoryId, _ := strconv.Atoi(c.Query("categoryId"))

	pioneerIds, err := PioneerCateDao.FindByCateId(categoryId, pageNum, currentPage)
	if err != nil {
		c.JSON(200, dto.Error())
	}

	pioneerList, err := PioneerDao.FindByIds(pioneerIds, currentPage, pageNum)
	if err != nil {
		c.JSON(200, dto.Error())
	} else {
		c.JSON(200, dto.OkAndData(pioneerList))
	}
}
