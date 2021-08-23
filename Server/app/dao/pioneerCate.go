package dao

import (
	. "DB-Server/database"
	. "DB-Server/models"
)

type PioneerCateDaoManage struct {
}

var PioneerCateDao PioneerCateDaoManage

// 根据某个领域的id获得此领域前人的id
func (*PioneerCateDaoManage) FindByCateId(categoryId, pageNum, currentPage int) (ids []int, err error) {

	err = GDB.Order("createdAt DESC").Limit(pageNum).Offset((currentPage-1)*pageNum).Pluck("pioneerId", &ids).Error
	return
}

// 创建前人与领域的连接
func (*PioneerCateDaoManage) Create(categoryId, pioneerId int) (pioneerCate *PioneerCate, err error) {

	pioneerCate = &PioneerCate{CategoryId: categoryId, PioneerId: pioneerId}
	err = GDB.Create(pioneerCate).Error
	return
}
