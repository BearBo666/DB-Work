package dao

import (
	. "DB-Server/database"
	. "DB-Server/models"
)

type PioneerCateDaoManage struct {
}

var PioneerCateDao PioneerCateDaoManage

// 根据某个领域的id获得此领域前人的id切片
func (*PioneerCateDaoManage) FindByCateId(categoryId, pageNum, currentPage int) (ids []int, err error) {

	err = GDB.Model(&PioneerCate{}).
		Order("id DESC").Limit(pageNum).
		Offset((currentPage-1)*pageNum).
		Pluck("pioneerId", &ids).Error
	return
}

// 创建前人与领域的连接
func (*PioneerCateDaoManage) Create(categoryId, pioneerId int) (pioneerCate *PioneerCate, err error) {

	pioneerCate = &PioneerCate{CategoryId: categoryId, PioneerId: pioneerId}
	if err = GDB.Create(pioneerCate).Error; err != nil {
		return nil, err
	}
	return
}
